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
* **Candidate Dashboard & Upload Match:** Clean, multi-step upload interface displaying real-time parsing animations. Shows matching score, status badges (Active/Archived), and date scanned.
* **Scan History & Version Analytics:** Full historical dashboard table of resume versions and associated job parameters with full text previews and side-by-side versions comparison.
* **Re-upload & Target Parameter Pre-filling:** Automatically restores the historical resume file metadata and pre-fills target role, company name, and job description fields.
* **Scan Deletion Confirmation:** Interactive confirm modal to safely remove specific resume scans with real-time UI refresh.

---

## ⚙️ Backend — Implemented Features
* **JWT Verifier:** Set up `ClerkJWTVerifier` in [auth.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/core/auth.py) implementing asymmetric `RS256` token validation utilizing cached Clerk JWKS keys.
* **Dependency Injection:** Configured `get_current_user` in [deps.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/api/deps.py) to authenticate incoming API routes and auto-register new profiles in PostgreSQL on-the-fly.
* **REST Endpoints:** Exposed versioned `/users/me` routes (GET & PUT) to query and modify current user settings.
* **System Health Check:** Exposed dynamic health monitoring.
* **Multi-Format Parsers:** Implemented robust extraction pipelines for PDF and DOCX resume documents.
* **Active Version Promotion:** Automated database-level versioning hierarchy where only one resume is active at a time, with fallback promotion logic on record deletion.
* **Version History Persistence:** Expanded SQL schemas for job descriptions, target roles, and companies, supporting decoupled version copies.

---

## 🗄️ Database & Authentication
* **Database Schema:** Set up the SQLAlchemy `User` mapping inside [user.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/models/user.py) with database properties for email notifications, RAG toggles, and strict ATS modes, applied via Alembic migrations.
* **Session Validation:** Token verification uses Clerk cookies on the frontend and bearer header validation on backend endpoints.

---

## 📈 Current Project Status

### Monorepo Milestone Verification Checkpoint (Phases 1, 2, & 3)

Below is the verified implementation status for the foundational phases of Resumiq:

| Phase / Task | Status | Details & Verification Links |
| :--- | :---: | :--- |
| **Phase 1 — Project Foundation** | | |
| 1. Initialize GitHub monorepo structure | ✅ | Core directories (`backend`, `frontend`, `docker`, `.github`, `scripts`) established in workspace root. |
| 2. Setup Next.js 16 frontend scaffold | ✅ | Scaffolding configured with Next.js v16 (`next: ^16.2.12`). See [package.json](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/package.json). |
| 3. Setup FastAPI backend scaffold | ✅ | Scaffolded with dependencies configured in [requirements.txt](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/requirements.txt). |
| 4. Configure PostgreSQL with Docker Compose | ✅ | PostgreSQL (`postgres:16-alpine`) set up in [docker-compose.yml](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/docker-compose.yml#L4-L24). |
| 5. Setup Docker Compose (FE, BE, DB, Redis) | ⚠️ | Frontend, backend, and PostgreSQL are fully configured. However, **Redis** is not included in the compose orchestration. See [docker-compose.yml](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/docker-compose.yml). |
| 6. Configure GitHub Actions CI (lint + test) | ⚠️ | Workflow runs frontend linters, typechecks, and backend linters (Ruff). However, **automated test suites** are not run as part of CI. See [ci.yml](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/.github/workflows/ci.yml). |
| 7. Setup environment configuration (`.env`, `config.py`) | ✅ | Managed via backend [config.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/core/config.py) and frontend config loaders. |
| 8. Setup structured logging | ✅ | Standardized using `structlog` backend integration. See [logging.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/core/logging.py). |
| 9. Setup clean architecture folder structure | ✅ | Folders structured logically. Frontend app router pages/components and backend endpoints/schemas separated. |
| 10. Enable Swagger / OpenAPI docs | ✅ | Exposed OpenAPI endpoints via FastAPI app initialization. See [main.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/main.py#L28-L30). |
| **Phase 2 — Authentication & User Management** | | |
| 11. Setup Clerk account & API keys | ✅ | Configured on frontend via [layout.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/app/layout.tsx#L49-L62) and validated on backend via [config.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/core/config.py#L43-L45). |
| 12. Design home page | ✅ | Dynamic landing layout configured in [page.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/app/page.tsx). |
| 13. Configure Clerk Email Verification | ✅ | Implemented in custom email sign-up verification screen. See [AuthCard.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/components/auth/AuthCard.tsx#L123-L126). |
| 14. Implement sign up flow | ✅ | Customized signup card integrated using Clerk SDK client methods. See [AuthCard.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/components/auth/AuthCard.tsx#L112-L127). |
| 15. Implement login flow | ✅ | Interactive sign-in layout (Email/Password and Google OAuth). See [AuthCard.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/components/auth/AuthCard.tsx#L95-L111). |
| 16. Implement protected routes (frontend) | ✅ | Configured route guard patterns on edge router paths using middleware. See [middleware.ts](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/middleware.ts). |
| 17. Implement JWT verification middleware (backend) | ✅ | Decodes Clerk RS256 JWT tokens using remote JWK keyset retrieval. See [auth.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/core/auth.py#L17-L50). |
| 18. Create Users table & model | ✅ | Declarative SQLAlchemy class mapping with schema variables. See [user.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/models/user.py) and migrations in `backend/alembic/versions`. |
| 19. Build user profile page | ✅ | Dynamic state forms updating target roles, ATS modes, and user fields. See [page.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/app/settings/page.tsx). |
| 20. Implement session management | ✅ | Authenticated token passes inside HTTP Authorization header wrapper. See [api.ts](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/services/api.ts#L26-L29). |
| 21. Implement get_current_user dependency | ✅ | Extracts user payload and auto-registers users in database. See [deps.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/api/deps.py#L27-L110). |
| **Phase 3 — Parsing, Matching & Versioning** | | |
| 22. PDF & DOCX resume parser pipelines | ✅ | Parsers extract structured resume sections (summary, experience, skills, etc.) |
| 23. Resume active/archived versioning database mapping | ✅ | Managed via `is_active` boolean on `resumes` table with automatic promotion. |
| 24. Pasted job description matching REST APIs | ✅ | Paste endpoint accepts target role, company, and JD text, copying active resume context. |
| 25. Re-upload flow with parameters pre-filling | ✅ | Fetches specific resume by ID and restores files and text inputs on upload page. |
| 26. Safe scan deletion API and UI triggers | ✅ | Implemented protected DELETE route and confirmation Dialogs on Dashboard/History. |

* **✅ Fully Implemented**
* **⚠️ Partially Implemented / Needs Improvement**

* **Next Implementation Steps:** Phase 4 — Semantic Search & Vector Embeddings configuration, initial FAISS index setup, and LLM matching algorithm.

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
