from typing import Any, Dict, Optional

import httpx
import jwt
from jwt import PyJWKClient
from jwt.exceptions import (
    ExpiredSignatureError,
    InvalidSignatureError,
    InvalidTokenError,
    PyJWKClientError,
)

from app.core.config import settings
from app.core.logging import logger


class ClerkJWTVerifier:
    """Clerk JWT Verifier class to retrieve public JWK keys and verify RS256 signatures."""

    def __init__(self, jwks_url: str):
        self.jwk_client = PyJWKClient(jwks_url)

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Decode and verify Clerk JWT using public JWKS."""
        try:
            # PyJWKClient caches keys internally to prevent making requests on every validation
            signing_key = self.jwk_client.get_signing_key_from_jwt(token)
            payload = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                options={"verify_aud": False},
            )
            if isinstance(payload, dict):
                return payload
        except ExpiredSignatureError as e:
            logger.warning("Clerk JWT token verification failed: expired signature", error=str(e))
        except InvalidSignatureError as e:
            logger.warning("Clerk JWT token verification failed: invalid signature", error=str(e))
        except PyJWKClientError as e:
            logger.error("Clerk JWT token verification failed: JWK client error", error=str(e))
        except InvalidTokenError as e:
            logger.warning("Clerk JWT token verification failed: invalid token", error=str(e))
        except Exception as e:
            logger.error("Clerk JWT token verification failed: unexpected error", error=str(e))
        return None


clerk_verifier = ClerkJWTVerifier(settings.CLERK_JWKS_URL)


async def fetch_clerk_user_info(clerk_id: str) -> Dict[str, Any]:
    """Fetch complete user profile attributes directly from the Clerk Backend API."""
    if not settings.CLERK_SECRET_KEY or settings.CLERK_SECRET_KEY == "your_clerk_secret_key_here":
        logger.warning("CLERK_SECRET_KEY is not configured; cannot fetch details from Clerk API.")
        return {}

    url = f"{settings.CLERK_API_URL}/users/{clerk_id}"
    headers = {"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, dict):
                    return data
            else:
                logger.error(
                    "Clerk API request failed",
                    status_code=response.status_code,
                    body=response.text,
                )
    except Exception as e:
        logger.error("Exception occurred while calling Clerk API", error=str(e))
    return {}
