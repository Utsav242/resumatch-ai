import uuid
from typing import TYPE_CHECKING, Any, Dict, Optional

from sqlalchemy import ForeignKey, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.user import User


class Resume(Base):
    """Resume database model to store parsed resume documents, raw text, and section metadata."""

    __tablename__ = "resumes"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)
    structured_sections: Mapped[Dict[str, Any]] = mapped_column(JSONB, nullable=False)
    file_metadata: Mapped[Dict[str, Any]] = mapped_column(JSONB, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    target_role: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    target_company: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    job_description_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    job_description_source: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="resumes")
