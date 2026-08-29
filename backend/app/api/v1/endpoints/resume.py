import uuid
from typing import Optional

from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user, get_db
from app.models.resume import Resume
from app.models.user import User
from app.schemas.resume import ResumeOut
from app.services.parsing.docx_parser import parse_docx
from app.services.parsing.pdf_parser import parse_pdf
from app.services.resume.segmentation import segment_resume
from app.services.upload.validation import validate_file_size, validate_resume_file

router = APIRouter()


@router.post("/upload", response_model=ResumeOut)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Resume:
    """Upload, validate, parse, segment, and persist a candidate resume (PDF or DOCX)."""
    # 1. Read file bytes
    file_bytes = await file.read()
    file_size = len(file_bytes)

    # 2. Validate file size and type
    validate_file_size(file_size)
    validate_resume_file(file.content_type or "", file.filename or "")

    # 3. Parse and extract text based on extension
    filename = file.filename or "resume.pdf"
    if filename.lower().endswith(".docx"):
        text, parse_metadata = parse_docx(file_bytes)
        content_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    else:
        text, parse_metadata = parse_pdf(file_bytes)
        content_type = "application/pdf"

    # 4. Segment resume text into key sections
    structured_sections = segment_resume(text)

    # 5. Populate file metadata
    file_metadata = {
        "filename": filename,
        "file_size": file_size,
        "content_type": content_type,
        "page_count": parse_metadata.get("page_count"),
    }

    # 6. Mark all existing resumes for this user as inactive
    stmt = update(Resume).where(Resume.user_id == current_user.id).values(is_active=False)
    await db.execute(stmt)

    # 7. Persist to PostgreSQL database
    db_resume = Resume(
        user_id=current_user.id,
        raw_text=text,
        structured_sections=structured_sections,
        file_metadata=file_metadata,
        is_active=True,
    )
    db.add(db_resume)
    await db.commit()
    await db.refresh(db_resume)

    return db_resume


@router.get("/latest", response_model=Optional[ResumeOut])
async def get_latest_resume(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Optional[Resume]:
    """Retrieve the latest uploaded resume for the authenticated user."""
    stmt = (
        select(Resume).where(Resume.user_id == current_user.id).order_by(Resume.created_at.desc())
    )
    result = await db.execute(stmt)
    return result.scalars().first()


@router.get("/active", response_model=Optional[ResumeOut])
async def get_active_resume(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Optional[Resume]:
    """Retrieve the active uploaded resume for the authenticated user."""
    stmt = select(Resume).where(Resume.user_id == current_user.id, Resume.is_active)
    result = await db.execute(stmt)
    return result.scalars().first()


@router.get("/", response_model=list[ResumeOut])
async def list_resumes(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[Resume]:
    """List all resumes uploaded by the authenticated user."""
    stmt = (
        select(Resume).where(Resume.user_id == current_user.id).order_by(Resume.created_at.desc())
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


@router.get("/{resume_id}", response_model=ResumeOut)
async def get_resume_by_id(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Resume:
    """Retrieve a specific uploaded resume by ID for the authenticated user."""
    stmt = select(Resume).where(Resume.user_id == current_user.id, Resume.id == resume_id)
    result = await db.execute(stmt)
    db_resume = result.scalars().first()
    if not db_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found.",
        )
    return db_resume


@router.delete("/{resume_id}", response_model=dict)
async def delete_resume(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Delete a specific resume by ID for the authenticated user and promote another active version if necessary."""
    # 1. Fetch the target resume to delete
    stmt = select(Resume).where(Resume.user_id == current_user.id, Resume.id == resume_id)
    result = await db.execute(stmt)
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found.",
        )

    # 2. Check if the deleted resume is the active one
    is_active_to_delete = resume.is_active

    # 3. Perform deletion
    await db.delete(resume)

    # 4. If the deleted resume was active, promote another resume to active (if one exists)
    if is_active_to_delete:
        # Find the latest remaining resume
        stmt_latest = (
            select(Resume)
            .where(Resume.user_id == current_user.id, Resume.id != resume_id)
            .order_by(Resume.created_at.desc())
        )
        result_latest = await db.execute(stmt_latest)
        latest_remaining = result_latest.scalars().first()
        if latest_remaining:
            latest_remaining.is_active = True
            db.add(latest_remaining)

    # 5. Commit database transaction
    await db.commit()

    return {"message": "Resume deleted successfully."}
