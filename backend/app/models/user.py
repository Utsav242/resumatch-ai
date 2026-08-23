from typing import Optional

from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class User(Base):
    """User database model to store account info, profile configuration, and settings."""

    __tablename__ = "users"

    clerk_id: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    first_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    last_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    avatar_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    target_role: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    target_industry: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    enable_rag: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    strict_ats: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    email_notifications: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
