# ResumeMatch AI — Enterprise AI Resume Intelligence Platform

[![Build & Lint CI](https://github.com/resumatch-ai/resumatch-ai/actions/workflows/ci.yml/badge.svg)](.github/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688.svg?style=flat&logo=FastAPI)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-000000.svg?style=flat&logo=Next.js)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB.svg?style=flat&logo=python)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6.svg?style=flat&logo=typescript)](https://typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-4169E1.svg?style=flat&logo=postgresql)](https://postgresql.org/)

**ResumeMatch AI** is a production-ready AI Resume Intelligence Platform that analyzes resumes against Job Descriptions using RAG (Retrieval-Augmented Generation), ATS scoring, and Large Language Models.

---

## 🏗️ Monorepo Directory Architecture

> 📖 For a comprehensive folder-by-folder breakdown and setup guide, see [MONOREPO_SETUP.md](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/MONOREPO_SETUP.md).

```
resumatch-ai/
├── .github/workflows/ci.yml   # Multi-job GitHub Actions CI Pipeline
├── .vscode/                   # Workspace formatters & extension recommendations
├── docker/                    # Multi-stage Dockerfiles & Postgres initialization
│   ├── backend/
│   ├── frontend/
│   └── postgres/
├── frontend/                  # Next.js 16 App Router + React 19 + Tailwind CSS
│   ├── src/app/               # App Router layouts & providers
│   ├── src/components/        # UI primitives & common layouts
│   ├── src/config/            # Zod runtime env schema validation
│   ├── src/hooks/             # Custom React hooks (TanStack Query)
│   ├── src/services/          # API Service Layer
│   └── src/types/             # TypeScript DTO definitions
├── backend/                   # FastAPI Python 3.12 Server
│   ├── app/api/               # Versioned endpoints & deps.py injection
│   ├── app/core/              # Pydantic BaseSettings, Async Database, Structlog
│   ├── app/models/            # SQLAlchemy 2.0 ORM Declarative Base
│   ├── app/schemas/           # Pydantic validation schemas
│   ├── app/services/          # Business logic, parsing & AI pipelines
│   ├── tests/                 # Pytest automated test suite (test_health.py)
│   └── alembic/               # Database Migration management environment
├── docs/                      # Technical docs (ARCHITECTURE.md, ROADMAP.md)
├── scripts/                   # Developer setup & utility scripts
├── docker-compose.yml         # Full-stack orchestrator
├── MONOREPO_SETUP.md          # Monorepo architecture & onboarding guide
└── README.md
```

---

## 🚀 Quickstart Guide

### Prerequisites
- [Docker Engine](https://docs.docker.com/get-docker/) & Docker Compose
- [Node.js 20+](https://nodejs.org/) (for local frontend development without Docker)
- [Python 3.12+](https://python.org/) (for local backend development without Docker)

### 1. Initial Setup
Run the developer onboarding script to prepare environment variables:
```bash
./scripts/setup.sh
```

### 2. Launch Stack via Docker Compose
To launch Frontend, Backend, and PostgreSQL containers concurrently:
```bash
docker compose up --build
```
Services will be accessible at:
- **Frontend Dashboard**: `http://localhost:3000`
- **FastAPI Interactive Docs**: `http://localhost:8000/api/v1/docs`
- **System Health API**: `http://localhost:8000/api/v1/health`
- **PostgreSQL Database**: `localhost:5432`

---

## 🛠️ Local Development (Non-Docker Mode)

### Running Backend Locally
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Running Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Configuration Management

- **Backend**: Uses Pydantic `BaseSettings` defined in `backend/app/core/config.py`. Enforces strong typing for database URIs, CORS origins, and logging levels.
- **Frontend**: Uses `Zod` runtime schema in `frontend/src/config/env.ts` to validate environment parameters (`NEXT_PUBLIC_API_URL`) on application boot.

---

## 🧪 Verification & Code Quality Commands

### Frontend Verification
```bash
cd frontend
npm run lint
npx tsc --noEmit
```

### Backend Verification
```bash
cd backend
ruff check .
```

---

## 📄 License
MIT License. Built for production SaaS scalability.
