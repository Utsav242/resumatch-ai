import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ResumeSectionOut(BaseModel):
    """Structured sections parsed from raw resume text."""

    summary: str
    experience: str
    education: str
    skills: str
    certifications: str
    other: str


class FileMetadataOut(BaseModel):
    """Metadata extracted from the uploaded document."""

    filename: str
    file_size: int
    content_type: str
    page_count: Optional[int] = None


class ResumeOut(BaseModel):
    """Pydantic schema representing the complete saved resume."""

    id: uuid.UUID
    user_id: uuid.UUID
    raw_text: str
    structured_sections: ResumeSectionOut
    file_metadata: FileMetadataOut
    is_active: bool
    target_role: Optional[str] = None
    target_company: Optional[str] = None
    job_description_text: Optional[str] = None
    job_description_source: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
