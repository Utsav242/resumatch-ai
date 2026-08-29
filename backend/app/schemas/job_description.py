from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class JobDescriptionPasteIn(BaseModel):
    """Pydantic schema representing the pasted job description details."""

    text: str = Field(..., min_length=1, description="Raw job description text content.")
    target_role: Optional[str] = None
    target_company: Optional[str] = None
    resume_id: Optional[str] = None


class JobDescriptionOut(BaseModel):
    """Pydantic schema representing the output of parsed Job Description."""

    raw_text: str
    metadata: Dict[str, Any]
