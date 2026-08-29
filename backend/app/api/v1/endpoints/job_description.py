from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user, get_db
from app.models.resume import Resume
from app.models.user import User
from app.schemas.job_description import JobDescriptionOut, JobDescriptionPasteIn
from app.services.parsing.pdf_parser import parse_pdf
from app.services.parsing.text_normalizer import normalize_text
from app.services.upload.validation import validate_file_size, validate_job_desc_file

router = APIRouter()


@router.post("/upload", response_model=JobDescriptionOut)
async def upload_job_description(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
) -> JobDescriptionOut:
    """Upload, validate, parse, and normalize a PDF job description."""
    # 1. Read file bytes
    file_bytes = await file.read()
    file_size = len(file_bytes)

    # 2. Validate file size and type (PDF only for Job Descriptions)
    validate_file_size(file_size)
    validate_job_desc_file(file.content_type or "", file.filename or "")

    # 3. Parse PDF
    text, parse_metadata = parse_pdf(file_bytes)

    # 4. Construct file metadata
    metadata = {
        "source": "upload",
        "filename": file.filename or "job_description.pdf",
        "file_size": file_size,
        "page_count": parse_metadata.get("page_count"),
    }

    return JobDescriptionOut(raw_text=text, metadata=metadata)


@router.post("/paste", response_model=JobDescriptionOut)
async def paste_job_description(
    payload: JobDescriptionPasteIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> JobDescriptionOut:
    """Normalize pasted job description text and create a new scan version in database."""
    # 1. Fetch user's active resume or specified resume by ID
    if payload.resume_id:
        import uuid
        try:
            resume_uuid = uuid.UUID(payload.resume_id)
            stmt = select(Resume).where(Resume.user_id == current_user.id, Resume.id == resume_uuid)
        except ValueError as e:
            raise HTTPException(
                status_code=400,
                detail="Invalid resume ID format.",
            ) from e
    else:
        stmt = select(Resume).where(Resume.user_id == current_user.id, Resume.is_active)

    result = await db.execute(stmt)
    active_resume = result.scalars().first()
    if not active_resume:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first before analyzing target job parameters.",
        )

    # 2. Normalize pasted text
    normalized = normalize_text(payload.text)

    # 3. Deactivate previous resumes/scans
    deactivate_stmt = (
        update(Resume)
        .where(Resume.user_id == current_user.id)
        .values(is_active=False)
    )
    await db.execute(deactivate_stmt)

    # 4. Create and save the new scan/version record in resumes table
    new_scan = Resume(
        user_id=current_user.id,
        raw_text=active_resume.raw_text,
        structured_sections=active_resume.structured_sections,
        file_metadata=active_resume.file_metadata,
        is_active=True,
        target_role=payload.target_role or "Target Role",
        target_company=payload.target_company or "Target Company",
        job_description_text=normalized,
        job_description_source="paste",
    )
    db.add(new_scan)
    await db.commit()
    await db.refresh(new_scan)

    # 5. Populate metadata details for response
    metadata = {
        "source": "paste",
        "target_role": new_scan.target_role,
        "target_company": new_scan.target_company,
    }

    return JobDescriptionOut(raw_text=normalized, metadata=metadata)
