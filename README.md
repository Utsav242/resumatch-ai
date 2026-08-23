# Resumiq — Enterprise AI Resume Intelligence Platform

[![Build & Lint CI](https://github.com/resumatch-ai/resumatch-ai/actions/workflows/ci.yml/badge.svg)](.github/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688.svg?style=flat&logo=FastAPI)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-000000.svg?style=flat&logo=Next.js)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB.svg?style=flat&logo=python)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6.svg?style=flat&logo=typescript)](https://typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-4169E1.svg?style=flat&logo=postgresql)](https://postgresql.org/)

## 📖 Project Overview
**Resumiq** is an enterprise-grade, production-ready AI Resume Intelligence Platform designed to match and analyze candidate resumes against job descriptions using semantic ATS algorithms and Retrieval-Augmented Generation (RAG). By integrating a secure modern Next.js frontend with a fast, async FastAPI backend, Resumiq provides real-time ATS scoring, profile configuration, and detailed matching reports.

---

## 🛠️ Tech Stack
* **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Material UI (MUI v9) for rich component styling, Tailwind CSS, TanStack React Query for state management, and Jest + React Testing Library for unit tests.
* **Backend:** FastAPI (Python 3.12), SQLAlchemy 2.0 for database mapping, Alembic for PostgreSQL migrations, PyJWT & Cryptography for JWT validation, and Pytest for async backend testing.
* **Infrastructure:** Docker & Docker Compose orchestrator, GitHub Actions for lint/build CI pipelines, and PostgreSQL database.

---

## 💻 Frontend — Implemented Features
* **Landing Page:** Interactive, modern home dashboard with responsive layout design, trust metrics, and light/dark theme context toggling.
* **Authentication UI:** Custom Clerk auth cards inside [AuthCard.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/components/auth/AuthCard.tsx) supporting Google OAuth redirects and email OTP verification.
* **Route Protection:** Built-in edge router guards in [middleware.ts](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/middleware.ts) redirecting unauthenticated sessions away from `/dashboard` sub-paths.
* **User Settings Dashboard:** Integrated a profile configuration page in [page.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/app/settings/page.tsx) to adjust target roles, domains, and ATS options, synced to the backend via mutations.

---

## ⚙️ Backend — Implemented Features
* **JWT Verifier:** Set up `ClerkJWTVerifier` in [auth.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/core/auth.py) implementing asymmetric `RS256` token validation utilizing cached Clerk JWKS keys.
* **Dependency Injection:** Configured `get_current_user` in [deps.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/api/deps.py) to authenticate incoming API routes and auto-register new profiles in PostgreSQL on-the-fly.
* **REST Endpoints:** Exposed versioned `/users/me` routes (GET & PUT) to query and modify current user settings.
* **System Health Check:** Exposed dynamic health monitoring.

---

## 🗄️ Database & Authentication
* **Database Schema:** Set up the SQLAlchemy `User` mapping inside [user.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/models/user.py) with database properties for email notifications, RAG toggles, and strict ATS modes, applied via Alembic migrations.
* **Session Validation:** Token verification uses Clerk cookies on the frontend and bearer header validation on backend endpoints.

---

## 📈 Current Project Status
* **Completed Areas:** Monorepo architecture setup, PostgreSQL container configurations, Clerk Auth frontend & backend JWT integration, settings page state synchronization, and comprehensive unit tests (9/9 passing tests).
* **Next Implementation Steps:** Phase 3 — Resume and Job Description file upload pipelines, document chunking parsers, and initial FAISS vector index configuration.

---

## 🛠️ Technology Stack Breakdown

| Layer | Category | Technology Used | Version / Description |
| :--- | :--- | :--- | :--- |
| **Frontend (FE)** | **Framework** | Next.js (App Router) | `15.1.0` (React 19) |
| | **Language** | TypeScript | `^5.4.3` |
| | **Styling & UI** | Tailwind CSS + Lucide Icons | `^3.4.1` / `^0.474.0` |
| | **State & Fetching** | TanStack Query | `^5.28.9` (`@tanstack/react-query`) |
| | **Form & Validation** | React Hook Form + Zod | `^7.51.1` / `^3.22.4` |
| | **Authentication** | Clerk Auth | `@clerk/nextjs` v7.6.4 |
| **Backend (BE)** | **Framework** | FastAPI (Async REST API) | `^0.110.0` |
| | **Language** | Python | `3.12+` |
| | **Database & ORM** | PostgreSQL 16 + SQLAlchemy | `2.0+` Async (`asyncpg`) |
| | **DB Migrations** | Alembic | `^1.13.1` |
| | **Config & Validation**| Pydantic v2 | `pydantic-settings` |
| | **Authentication** | PyJWT + Cryptography | RS256 JWKS validation |
| | **Logging & Linting** | Structlog + Ruff | Structured JSON Logging & Ruff |
| | **Testing Suite** | Pytest + HTTPX Async | `pytest-asyncio` / `anyio` |
| **DevOps & Infra** | **Containers** | Docker & Docker Compose | Multi-stage Dockerfiles |
| | **CI/CD Pipeline** | GitHub Actions | Automated Lint & Build pipeline |

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
npm run lint      # Lint styles and checks
npx tsc --noEmit  # TypeScript typecheck
npm run test      # Run Jest unit tests
```

### Backend Verification
```bash
cd backend
ruff check .      # Python linting
mypy .            # Python static typechecking
pytest            # Run Pytest unit tests
```

### Running Tests in Docker
```bash
# Run backend test suite inside container
docker compose exec backend pytest
```

---

## 📄 License
MIT License. Built for production SaaS scalability.
