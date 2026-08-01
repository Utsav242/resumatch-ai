import pytest
from httpx import AsyncClient


@pytest.mark.anyio
async def test_health_endpoint(async_client: AsyncClient):
    """Test system health check endpoint."""
    response = await async_client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "environment" in data
    assert "version" in data
    assert "database_connected" in data
