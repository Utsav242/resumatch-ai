import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    """Base Pydantic schema for User shared properties."""

    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
    target_role: Optional[str] = None
    target_industry: Optional[str] = None
    enable_rag: bool = True
    strict_ats: bool = True
    email_notifications: bool = True


class UserCreate(UserBase):
    """Pydantic schema for creating a User."""

    clerk_id: str


class UserUpdate(BaseModel):
    """Pydantic schema for updating User settings and preferences."""

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
    target_role: Optional[str] = None
    target_industry: Optional[str] = None
    enable_rag: Optional[bool] = None
    strict_ats: Optional[bool] = None
    email_notifications: Optional[bool] = None


class UserOut(UserBase):
    """Pydantic schema for outputting User data, including generated metadata."""

    id: uuid.UUID
    clerk_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
