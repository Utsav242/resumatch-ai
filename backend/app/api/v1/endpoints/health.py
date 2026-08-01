from fastapi import APIRouter, status

from app.core.config import settings
from app.core.database import check_database_connection
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse, status_code=status.HTTP_200_OK)
async def get_system_health() -> HealthResponse:
    """Verify backend status and PostgreSQL database connection."""
    db_healthy = await check_database_connection()
    overall_status = "healthy" if db_healthy else "degraded"

    return HealthResponse(
        status=overall_status,
        environment=settings.ENVIRONMENT,
        version=settings.VERSION,
        database_connected=db_healthy,
    )
