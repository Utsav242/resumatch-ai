from fastapi import APIRouter

from app.api.v1.endpoints import health, job_description, resume, users

api_router = APIRouter()
api_router.include_router(health.router, tags=["System Health"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(resume.router, prefix="/resume", tags=["Resume"])
api_router.include_router(
    job_description.router, prefix="/job-description", tags=["Job Description"]
)
