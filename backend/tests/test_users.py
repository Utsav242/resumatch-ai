import uuid
from datetime import datetime, timezone
from typing import AsyncGenerator, Generator
from unittest.mock import AsyncMock, MagicMock

import pytest
from httpx import AsyncClient

from app.api.deps import get_current_user, get_db
from app.main import app
from app.models.user import User

# Create a mock User object for testing
mock_db_user = User(
    id=uuid.uuid4(),
    clerk_id="user_123",
    email="test@example.com",
    first_name="Test",
    last_name="User",
    avatar_url="https://avatar.com/test.png",
    target_role="Software Engineer",
    target_industry="Tech",
    enable_rag=True,
    strict_ats=True,
    email_notifications=True,
    created_at=datetime.now(timezone.utc),
    updated_at=datetime.now(timezone.utc),
)


async def override_get_current_user() -> User:
    """Mock dependency to return a static mock user."""
    return mock_db_user


# Mock database session
mock_session = MagicMock()
mock_session.commit = AsyncMock()
mock_session.refresh = AsyncMock()
mock_session.rollback = AsyncMock()


async def override_get_db() -> AsyncGenerator[MagicMock, None]:
    """Mock database session generator."""
    yield mock_session


@pytest.fixture(autouse=True)
def setup_dependency_overrides() -> Generator[None, None, None]:
    """Register FastAPI overrides for dependencies."""
    app.dependency_overrides[get_current_user] = override_get_current_user
    app.dependency_overrides[get_db] = override_get_db
    yield
    app.dependency_overrides.clear()


@pytest.mark.anyio
async def test_read_current_user(async_client: AsyncClient) -> None:
    """Test retrieving profile details of current user."""
    response = await async_client.get("/api/v1/users/me")
    assert response.status_code == 200
    data = response.json()
    assert data["clerk_id"] == "user_123"
    assert data["email"] == "test@example.com"
    assert data["first_name"] == "Test"
    assert data["last_name"] == "User"


@pytest.mark.anyio
async def test_update_current_user_preferences(async_client: AsyncClient) -> None:
    """Test modifying configuration preferences of current user."""
    update_payload = {
        "target_role": "Staff Software Engineer",
        "target_industry": "Finance",
        "enable_rag": False,
        "strict_ats": False,
        "email_notifications": False,
    }

    response = await async_client.put("/api/v1/users/me", json=update_payload)
    assert response.status_code == 200
    data = response.json()

    assert data["target_role"] == "Staff Software Engineer"
    assert data["target_industry"] == "Finance"
    assert data["enable_rag"] is False
    assert data["strict_ats"] is False
    assert data["email_notifications"] is False

    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once()
