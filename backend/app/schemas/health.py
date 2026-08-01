from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    environment: str = Field(..., example="development")
    version: str = Field(..., example="1.0.0")
    database_connected: bool = Field(..., example=True)
