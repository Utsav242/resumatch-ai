from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.user import UserOut, UserUpdate

router = APIRouter()


@router.get("/me", response_model=UserOut)
async def read_current_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """Retrieve details and engine configuration preferences for the current user."""
    return current_user


@router.put("/me", response_model=UserOut)
async def update_current_user_preferences(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Update engine configuration preferences and other user-modifiable profile fields."""
    update_data = user_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(current_user, field, value)

    db.add(current_user)
    try:
        await db.commit()
        await db.refresh(current_user)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update user preferences in database: {str(e)}",
        ) from e

    return current_user
