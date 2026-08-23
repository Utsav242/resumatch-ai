from typing import AsyncGenerator, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import clerk_verifier, fetch_clerk_user_info
from app.core.database import AsyncSessionLocal
from app.models.user import User

reusable_oauth2 = HTTPBearer(auto_error=False)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI Dependency for providing async database sessions per request."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token_credentials: Optional[HTTPAuthorizationCredentials] = Depends(reusable_oauth2),
) -> User:
    """FastAPI dependency to verify a Clerk JWT token and retrieve the user.

    Automatically registers/creates the User if they exist in Clerk but not in PostgreSQL.
    """
    if not token_credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization Header",
        )

    token = token_credentials.credentials
    payload = clerk_verifier.verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
        )

    clerk_id = payload.get("sub")
    if not clerk_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token does not contain a subject claim (sub)",
        )

    # Fetch user from database
    result = await db.execute(select(User).where(User.clerk_id == clerk_id))
    user = result.scalars().first()

    if not user:
        # User is authenticated by Clerk but not in our database yet -> auto-register them
        clerk_info = await fetch_clerk_user_info(clerk_id)

        # Extract primary email address
        email = None
        email_addresses = clerk_info.get("email_addresses", [])
        if email_addresses:
            primary_email_id = clerk_info.get("primary_email_address_id")
            for email_obj in email_addresses:
                if email_obj.get("id") == primary_email_id:
                    email = email_obj.get("email_address")
                    break
            if not email:
                email = email_addresses[0].get("email_address")

        # Fallbacks if email not found or Clerk API keys are missing
        if not email:
            email = payload.get("email") or f"{clerk_id}@placeholder.com"

        first_name = clerk_info.get("first_name") or payload.get("first_name")
        last_name = clerk_info.get("last_name") or payload.get("last_name")
        avatar_url = clerk_info.get("image_url") or payload.get("picture")

        # Create user in PostgreSQL database
        user = User(
            clerk_id=clerk_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            avatar_url=avatar_url,
            enable_rag=True,
            strict_ats=True,
            email_notifications=True,
        )
        db.add(user)
        try:
            await db.commit()
            await db.refresh(user)
        except Exception as e:
            await db.rollback()
            # Double check if user was created concurrently
            result = await db.execute(select(User).where(User.clerk_id == clerk_id))
            user = result.scalars().first()
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Failed to auto-register user in database: {str(e)}",
                ) from e

    return user

