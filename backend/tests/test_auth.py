from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from jwt.exceptions import ExpiredSignatureError

from app.core.auth import ClerkJWTVerifier, fetch_clerk_user_info


@pytest.mark.anyio
async def test_clerk_jwt_verifier_success() -> None:
    """Test successful token verification."""
    verifier = ClerkJWTVerifier("https://mock-jwks-url")
    mock_payload = {"sub": "user_123", "email": "test@example.com"}

    with (
        patch.object(verifier.jwk_client, "get_signing_key_from_jwt") as mock_key,
        patch("jwt.decode", return_value=mock_payload) as mock_decode,
    ):
        mock_key.return_value = MagicMock()
        payload = verifier.verify_token("mock-token")

        assert payload == mock_payload
        mock_decode.assert_called_once()


@pytest.mark.anyio
async def test_clerk_jwt_verifier_expired() -> None:
    """Test verification when token has expired."""
    verifier = ClerkJWTVerifier("https://mock-jwks-url")

    with (
        patch.object(verifier.jwk_client, "get_signing_key_from_jwt") as mock_key,
        patch("jwt.decode", side_effect=ExpiredSignatureError("Token expired")),
    ):
        mock_key.return_value = MagicMock()
        payload = verifier.verify_token("mock-token")

        assert payload is None


@pytest.mark.anyio
async def test_fetch_clerk_user_info_success() -> None:
    """Test successful retrieval of user info from Clerk backend API."""
    mock_response = {
        "id": "user_123",
        "first_name": "Test",
        "last_name": "User",
        "email_addresses": [{"email_address": "test@example.com", "id": "email_123"}],
        "primary_email_address_id": "email_123",
    }

    with patch("app.core.auth.settings") as mock_settings:
        mock_settings.CLERK_SECRET_KEY = "sk_test_mock"
        mock_settings.CLERK_API_URL = "https://api.clerk.com/v1"

        mock_client = MagicMock()
        mock_client.get = AsyncMock(
            return_value=MagicMock(status_code=200, json=lambda: mock_response)
        )

        # Patch the context manager return value
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=None)

        with patch("httpx.AsyncClient", return_value=mock_client):
            info = await fetch_clerk_user_info("user_123")
            assert info == mock_response
