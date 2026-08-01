# ResumeMatch AI — SaaS Product Roadmap

This document outlines the detailed 10-phase product roadmap for building **ResumeMatch AI** from initial foundation to a production-ready AI SaaS platform.

---

## 📊 Roadmap Overview Summary

| Phase | Title | Focus Area | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Project Foundation | Monorepo, Docker, CI/CD, FastAPI & Next.js scaffold | ✅ Complete |
| **Phase 2** | Authentication & User Management | Clerk Auth, JWT verification, Users DB model, Sessions | ⏳ Planned |
| **Phase 3** | Resume & JD Upload | PDF/DOCX parsing, section segmentation, upload APIs | ⏳ Planned |
| **Phase 4** | Knowledge Base & RAG | ATS guidelines, chunking, `bge-small` embeddings, FAISS | ⏳ Planned |
| **Phase 5** | ATS Analysis Engine | Deterministic & LLM scoring, LangChain chain, reporting | ⏳ Planned |
| **Phase 6** | AI Resume Editor | Suggestions engine, diff view UI, accept/reject actions | ⏳ Planned |
| **Phase 7** | Reports & Dashboard | History page, PDF export, JSON download, version comparison | ⏳ Planned |
| **Phase 8** | Production Readiness | Rate limiting, Redis caching, end-to-end testing, docs | ⏳ Planned |
| **Phase 9** | Deployment | Vercel, Railway/Render, Supabase Postgres, Pinecone | ⏳ Planned |
| **Phase 10** | Future Premium Features | Interview generator, Cover Letter, LinkedIn optimizer, Subscriptions | ⏳ Planned |

---

## 🗺️ Detailed 10-Phase Task Execution Plan

### 🚀 Phase 1 — Project Foundation (Completed)
- [x] Initialize GitHub monorepo structure (`frontend/` + `backend/`)
- [x] Setup Next.js 16 frontend scaffold (React 19, Tailwind CSS, TanStack Query)
- [x] Setup FastAPI backend scaffold (Python 3.12, Pydantic v2)
- [x] Configure PostgreSQL with Docker Compose (SQLAlchemy 2.0 Async + Alembic)
- [x] Setup Docker Compose orchestrator (frontend, backend, postgres DB)
- [x] Configure GitHub Actions CI pipeline (`.github/workflows/ci.yml`)
- [x] Setup environment configuration (`.env`, `config.py`, `env.ts`)
- [x] Setup structured logging (`structlog`)
- [x] Setup clean architecture folder structure (`api/deps.py`, `services/`, `models/`, `schemas/`)
- [x] Enable Swagger / OpenAPI documentation (`/api/v1/docs`)

---

### 🔑 Phase 2 — Authentication & User Management
- [ ] Setup Clerk account & API keys
- [ ] Implement sign up flow
- [ ] Implement login flow
- [ ] Implement protected routes (frontend)
- [ ] Implement JWT verification middleware (backend)
- [ ] Create Users table & SQLAlchemy model
- [ ] Build user profile page
- [ ] Implement session management
- [ ] Implement `get_current_user` FastAPI dependency

---

### 📄 Phase 3 — Resume & Job Description Upload
- [ ] Build drag & drop upload UI
- [ ] Implement file validation (type/size checks)
- [ ] Implement PDF parser (`PyMuPDF` / `pdfplumber`)
- [ ] Implement DOCX parser (`python-docx`)
- [ ] Build section segmentation engine (summary, experience, education, skills, certs)
- [ ] Implement `POST /api/v1/resume/upload` endpoint
- [ ] Implement `POST /api/v1/job-description` endpoint
- [ ] Build parse preview UI
- [ ] Store parsed resume & JD structured data in DB
- [ ] Handle JD paste vs PDF upload

---

### 🧠 Phase 4 — Knowledge Base & RAG Pipeline
- [ ] Curate ATS rules documents
- [ ] Curate resume writing guidelines
- [ ] Curate HR best practices docs
- [ ] Curate resume examples dataset
- [ ] Curate keyword / JD sample docs
- [ ] Implement document chunking strategy
- [ ] Implement embedding model integration (`bge-small` / HuggingFace)
- [ ] Setup FAISS vector store integration
- [ ] Build Knowledge Base ingestion script
- [ ] Implement hybrid retriever (dense vector + BM25 keyword retrieval)
- [ ] Design & test prompt templates
- [ ] Validate retrieval quality manually

---

### 🎯 Phase 5 — ATS Analysis Engine
- [ ] Implement deterministic formatting scorer
- [ ] Implement deterministic keyword scorer
- [ ] Implement LLM-based skills/experience/education scoring
- [ ] Build LangChain scoring chain
- [ ] Implement missing keyword detection
- [ ] Implement strengths / weaknesses generation
- [ ] Implement citation mapping
- [ ] Build `POST /api/v1/ats/analyze` endpoint (async task)
- [ ] Build `GET /api/v1/report/{id}` endpoint
- [ ] Build ATS Report UI (scores, breakdown charts, feedback)

---

### ✏️ Phase 6 — AI Resume Editor
- [ ] Build suggestion generation chain (summary, bullets, projects)
- [ ] Implement keyword optimization suggestions
- [ ] Implement missing skill suggestions
- [ ] Build diff view UI (current vs suggested text)
- [ ] Implement accept / reject / edit actions
- [ ] Build `POST /api/v1/resume/update` endpoint
- [ ] Implement live preview of edited resume
- [ ] Track suggestion decisions in DB

---

### 📊 Phase 7 — Reports & Dashboard
- [ ] Build History page UI
- [ ] Build `GET /api/v1/history` endpoint
- [ ] Build `DELETE /api/v1/history/{id}` endpoint
- [ ] Implement PDF report generation (`weasyprint` / headless browser renderer)
- [ ] Implement JSON export functionality
- [ ] Implement `GET /api/v1/report/{id}/download` endpoint
- [ ] Build resume version comparison view
- [ ] Implement share report link functionality

---

### 🛡️ Phase 8 — Production Readiness
- [ ] Implement rate limiting (`slowapi` / Redis)
- [ ] Add request validation everywhere
- [ ] Add structured logging across all services
- [ ] Implement Redis caching (embeddings, retrieval responses)
- [ ] Write unit tests (parsers, scorers)
- [ ] Write API integration tests
- [ ] Write UI component tests
- [ ] Write comprehensive project documentation

---

### ☁️ Phase 9 — Deployment & Cloud Setup
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway / Render
- [ ] Setup Supabase PostgreSQL (production database)
- [ ] Setup Supabase Storage (production resume file bucket)
- [ ] Swap local FAISS vector store to Pinecone for production
- [ ] Configure environment secrets across cloud providers
- [ ] Run smoke tests in production environment
- [ ] Setup custom domain + HTTPS certificates

---

### 🔮 Phase 10 — Future Premium Features
- [ ] Interview question generator
- [ ] Cover letter generator
- [ ] LinkedIn profile optimizer
- [ ] Skill-gap analysis engine
- [ ] Career roadmap generator
- [ ] Recruiter dashboard
- [ ] Usage analytics dashboard
- [ ] Subscription & billing integration (Stripe)
