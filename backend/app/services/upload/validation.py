from fastapi import HTTPException, status

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB in bytes

ALLOWED_RESUME_TYPES = {
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
}

ALLOWED_JOB_DESC_TYPES = {
    "application/pdf": ".pdf",
}


def validate_file_size(file_size: int) -> None:
    """Validate that the file size is within the allowed limit (10MB)."""
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds the maximum limit of {MAX_FILE_SIZE // (1024 * 1024)}MB.",
        )


def validate_resume_file(content_type: str, filename: str) -> None:
    """Validate that the resume file has an allowed type and extension."""
    # Check mime type or extension
    ext = f".{filename.split('.')[-1].lower()}" if "." in filename else ""

    if content_type not in ALLOWED_RESUME_TYPES and ext not in ALLOWED_RESUME_TYPES.values():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported resume file format. Only PDF and DOCX files are allowed.",
        )


def validate_job_desc_file(content_type: str, filename: str) -> None:
    """Validate that the job description file has an allowed type (PDF only)."""
    ext = f".{filename.split('.')[-1].lower()}" if "." in filename else ""

    if content_type not in ALLOWED_JOB_DESC_TYPES and ext not in ALLOWED_JOB_DESC_TYPES.values():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported job description file format. Only PDF files are allowed.",
        )
