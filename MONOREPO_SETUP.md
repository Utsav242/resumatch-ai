# ResumeMatch AI — Monorepo Setup & Directory Architecture

This document provides a comprehensive guide to the monorepo structure of **ResumeMatch AI**, explaining the purpose of each folder, component, and configuration file, along with instructions for setup and local development.

---

## 🛠️ Technology Stack Breakdown

| Layer | Category | Technology Used | Version / Description |
| :--- | :--- | :--- | :--- |
| **Frontend (FE)** | **Framework** | Next.js (App Router) | `15.1.0` (React 19) |
| | **Language** | TypeScript | `^5.4.3` |
| | **Styling & UI** | Tailwind CSS + Lucide Icons | `^3.4.1` / `^0.474.0` |
| | **State & Fetching** | TanStack Query | `^5.28.9` (`@tanstack/react-query`) |
| | **Form & Validation** | React Hook Form + Zod | `^7.51.1` / `^3.22.4` |
| **Backend (BE)** | **Framework** | FastAPI (Async REST API) | `^0.110.0` |
| | **Language** | Python | `3.12+` |
| | **Database & ORM** | PostgreSQL 16 + SQLAlchemy | `2.0+` Async (`asyncpg`) |
| | **DB Migrations** | Alembic | `^1.13.1` |
| | **Config & Validation**| Pydantic v2 | `pydantic-settings` |
| | **Logging & Linting** | Structlog + Ruff | Structured JSON Logging & Ruff |
| | **Testing Suite** | Pytest + HTTPX Async | `pytest-asyncio` / `anyio` |
| **DevOps & Infra** | **Containers** | Docker & Docker Compose | Multi-stage Dockerfiles |
| | **CI/CD Pipeline** | GitHub Actions | Automated Lint & Build pipeline |

---

## 📐 Monorepo Folder Structure

```text
resumatch-ai/
├── .github/                  # GitHub Actions CI/CD workflows & templates
│   └── workflows/
│       └── ci.yml            # Multi-job CI pipeline (Frontend & Backend validation)
├── .vscode/                  # Shared IDE settings & recommended workspace extensions
├── docker/                   # Custom multi-stage Dockerfiles & database initialization
│   ├── backend/
│   │   └── Dockerfile        # Production Python 3.12 FastAPI Dockerfile
│   ├── frontend/
│   │   └── Dockerfile        # Multi-stage Next.js 16 standalone Dockerfile
│   └── postgres/
│       └── init.sql          # DB initialization script (PostgreSQL extensions: uuid-ossp, pg_trgm)
├── frontend/                 # Next.js 16 Web Application (Frontend stack)
│   ├── src/
│   │   ├── app/              # Next.js App Router (pages, layouts, global CSS, providers)
│   │   ├── components/       # UI components (common layouts, UI primitives, headers/footers)
│   │   ├── config/           # Runtime environment validation via Zod
│   │   ├── hooks/            # Custom React hooks & TanStack Query state managers
│   │   ├── services/         # API Service client layer for Backend communication
│   │   ├── types/            # TypeScript DTOs, request/response models, and interfaces
│   │   └── utils/            # Helper functions and utilities (e.g., clsx, tailwind-merge)
│   ├── public/               # Static assets (favicons, images, public SVGs)
│   ├── package.json          # Frontend dependencies & scripts
│   ├── tsconfig.json         # TypeScript compiler configuration
│   └── tailwind.config.ts    # Tailwind CSS design system configuration
├── backend/                  # FastAPI Python 3.12 Server (Backend stack)
│   ├── app/
│   │   ├── api/              # Versioned API routes (/health, /resumes, /jd)
│   │   │   ├── v1/           # API Version 1 endpoints & router definition
│   │   │   └── deps.py       # FastAPI Dependency Injection container (get_db, auth)
│   │   ├── core/             # Central core configurations (Pydantic BaseSettings, DB session, logger)
│   │   ├── models/           # SQLAlchemy 2.0 ORM database models
│   │   ├── schemas/          # Pydantic v2 schemas for request/response serialization & validation
│   │   ├── services/         # Service layer package for business logic, parsing & AI pipelines
│   │   └── main.py           # FastAPI application entry point, middleware & route registration
│   ├── tests/                # Automated backend test suite (pytest & httpx async tests)
│   │   ├── conftest.py       # Pytest fixtures and async test client setup
│   │   └── test_health.py    # Health check endpoint unit & integration test
│   ├── alembic/              # Database migration environment & migration scripts
│   ├── pyproject.toml        # Python project metadata & Ruff linter configuration
│   ├── requirements.txt      # Backend Python dependencies
│   └── alembic.ini           # Alembic migration configuration
├── docs/                     # Technical documentation & system architecture specifications
│   ├── ARCHITECTURE.md       # High-level architecture blueprint & mermaid diagrams
│   └── ROADMAP.md            # Phased product release roadmap (Phase 1 to Phase 5)
├── scripts/                  # Onboarding & utility scripts
│   └── setup.sh              # Developer setup script to initialize local environment files (.env)
├── .env.example              # Central environment variable template for root workspace
├── docker-compose.yml        # Docker Compose orchestrator for Frontend, Backend & Postgres
├── LICENSE                   # Project license file
└── README.md                 # Primary project overview and quickstart guide
```

---

## 📂 Folder Breakdown & Detailed Purpose

### 1. `.github/`
- **Purpose**: Contains automated workflows and GitHub configuration.
- **Key Files**:
  - [ci.yml](file:///.github/workflows/ci.yml): Multi-job GitHub Actions pipeline that runs on every pull request and push to `main`. Automatically checks:
    - Backend: `ruff` linting, `pytest` unit tests, and FastAPI startup check.
    - Frontend: `npm run lint` and `npx tsc --noEmit` build validation.

### 2. `.vscode/`
- **Purpose**: Workspace settings shared across team members to enforce consistent formatting, linting, and editor extensions across VS Code and Cursor.

### 3. `docker/`
- **Purpose**: Holds containerization blueprints for all system services.
- **Folders**:
  - `docker/backend/Dockerfile`: Multi-stage build for Python 3.12 FastAPI server.
  - `docker/frontend/Dockerfile`: Optimized multi-stage build using Next.js standalone output.
  - `docker/postgres/init.sql`: SQL script executed when Postgres container starts up. Enables `uuid-ossp` and `pg_trgm` extensions.

### 4. `frontend/`
- **Purpose**: Next.js 16 App Router web application providing the user interface.
- **Folder Breakdown**:
  - `src/app/`: Next.js App Router routing structure. Contains global `layout.tsx`, `page.tsx`, and [providers.tsx](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/app/providers.tsx) for context providers (TanStack Query).
  - `src/components/`: Visual components separated into `common` (Header, Footer) and UI primitives.
  - `src/config/`: Zod-validated environment config loader (`env.ts`) ensuring `NEXT_PUBLIC_API_URL` is set.
  - `src/hooks/`: React custom hooks (e.g., [use-health.ts](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/frontend/src/hooks/use-health.ts) for polling backend status).
  - `src/services/`: API client layer using `fetch` to interact with backend REST APIs.
  - `src/types/`: TypeScript interface definitions for API responses and component props.
  - `src/utils/`: Shared utilities like `cn()` classname merger.

### 5. `backend/`
- **Purpose**: FastAPI Python 3.12 microservice handling business logic, database queries, and AI pipelines.
- **Folder Breakdown**:
  - `app/api/`: API Routing and Dependency Injection:
    - `v1/`: Versioned API endpoints (e.g., `/health`).
    - [deps.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/app/api/deps.py): Centralized dependency injection module (`get_db`, authentication dependencies).
  - `app/core/`: Essential infrastructure modules:
    - `config.py`: Pydantic `BaseSettings` for reading `.env`.
    - `database.py`: Async SQLAlchemy 2.0 engine & session generator.
    - `logging.py`: Structured JSON logger via `structlog`.
  - `app/models/`: Declarative SQLAlchemy database entities.
  - `app/schemas/`: Pydantic models for REST request payload validation and response DTOs.
  - `app/services/`: Business logic, document parsing, ATS scoring algorithms, and AI RAG processing.
  - `app/main.py`: FastAPI server startup script.
  - `tests/`: Automated test suite ([conftest.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/tests/conftest.py), [test_health.py](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/backend/tests/test_health.py)).
  - `alembic/`: Database versioning and migration history.

### 6. `docs/`
- **Purpose**: Project documentation, architectural diagrams, API specs, and monorepo guide files.
- **Key Files**:
  - [ARCHITECTURE.md](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/docs/ARCHITECTURE.md): System architecture blueprint and sequence diagrams.
  - [ROADMAP.md](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/docs/ROADMAP.md): Phased development plan from Phase 1 foundation to Phase 5 SaaS release.
  - `MONOREPO_SETUP.md`: This file.

### 7. `scripts/`
- **Purpose**: Shell and utility scripts for developer productivity.
- **Key Files**:
  - [setup.sh](file:///home/utsav.goel/Documents/Upskill/resumatch-ai/scripts/setup.sh): Initializes `.env` files across root, frontend, and backend.

---

## ⚙️ Monorepo Setup & Onboarding Guide

### Prerequisites
Ensure you have the following installed on your machine:
- [Docker Engine](https://docs.docker.com/get-docker/) & Docker Compose
- [Node.js 20+](https://nodejs.org/) (for local frontend development)
- [Python 3.12+](https://python.org/) (for local backend development)

---

### Step 1: Clone & Run Setup Script
Run the automated environment setup script from the monorepo root:
```bash
./scripts/setup.sh
```
This script creates copy versions of `.env.example` into `.env`, `frontend/.env.local`, and `backend/.env`.

---

### Step 2: Running via Docker Compose (Recommended)
To launch all services (Frontend, Backend, and PostgreSQL DB) in orchestrated containers:

```bash
docker compose up --build
```

#### Running Services:
| Service | URL / Port | Description |
| :--- | :--- | :--- |
| **Frontend UI** | `http://localhost:3000` | Next.js Dashboard & Web App |
| **FastAPI Swagger Docs** | `http://localhost:8000/api/v1/docs` | Interactive OpenAPI Documentation |
| **Backend Health Check** | `http://localhost:8000/api/v1/health` | System Health Monitoring Endpoint |
| **PostgreSQL Database** | `localhost:5433` | Relational DB (User: `resumatch_admin`, DB: `resumatch_db`) |

---

### Step 3: Local Development (Non-Docker Mode)

#### 1. Backend Setup:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

#### 3. Running Database Migrations:
```bash
cd backend
source .venv/bin/activate
alembic upgrade head
```

---

## 🖥️ Server Execution Commands Quick Reference Table

| Target Component | Execution Mode | Command | URL / Endpoint |
| :--- | :--- | :--- | :--- |
| **All Stack Services** | Docker Compose (Foreground) | `docker compose up --build` | `http://localhost:3000` |
| **All Stack Services** | Docker Compose (Background/Detached) | `docker compose up -d --build` | `http://localhost:3000` |
| **FastAPI Backend** | Local Python Development | `cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000` | `http://localhost:8000/api/v1/docs` |
| **Next.js Frontend** | Local Node.js Development | `cd frontend && npm run dev` | `http://localhost:3000` |
| **PostgreSQL Database** | Migration Execution | `cd backend && source .venv/bin/activate && alembic upgrade head` | `localhost:5432` |

---

## 🛠️ Verification & Useful Commands

- **Run Backend Tests (`pytest`)**:
  ```bash
  cd backend && source .venv/bin/activate && pytest
  ```
- **Check Frontend Types (`tsc`)**:
  ```bash
  cd frontend && npx tsc --noEmit
  ```
- **Lint Backend (`ruff`)**:
  ```bash
  cd backend && ruff check .
  ```
- **Stop Docker Stack**:
  ```bash
  docker compose down
  ```
