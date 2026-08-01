"use client";

import { useHealth } from "@/hooks/use-health";
import { Database, Server, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export default function Home() {
  const { data: health, isLoading } = useHealth();

  return (
    <div className="space-y-12 py-6">
      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 1 Complete: Monorepo &amp; System Foundation</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
          ResumeMatch<span className="text-blue-500">.AI</span> Intelligence Platform
        </h1>
        <p className="text-slate-400 text-lg">
          Enterprise foundation initialized with Next.js 16, React 19, FastAPI Python 3.12, SQLAlchemy 2.0, PostgreSQL, and Docker Compose.
        </p>
      </section>

      {/* Live System Status Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Backend API Health */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Server className="w-6 h-6" />
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                health?.status === "healthy"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              {isLoading ? "Connecting..." : health?.status || "Offline"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">FastAPI Backend</h3>
            <p className="text-xs text-slate-400 mt-1">Python 3.12 • Asynchronous Uvicorn</p>
          </div>
          <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between">
              <span>Environment:</span>
              <span className="font-mono text-slate-200">{health?.environment || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>API Version:</span>
              <span className="font-mono text-slate-200">{health?.version || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Database Connectivity */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Database className="w-6 h-6" />
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                health?.database_connected
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/30"
              }`}
            >
              {health?.database_connected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">PostgreSQL Database</h3>
            <p className="text-xs text-slate-400 mt-1">SQLAlchemy 2.0 Asyncpg Driver</p>
          </div>
          <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between">
              <span>Container:</span>
              <span className="font-mono text-slate-200">resumatch_postgres</span>
            </div>
            <div className="flex justify-between">
              <span>Migrations:</span>
              <span className="font-mono text-slate-200">Alembic Configured</span>
            </div>
          </div>
        </div>

        {/* DevOps & Docker Status */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-400 border-blue-500/30">
              Production Ready
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">DevOps Architecture</h3>
            <p className="text-xs text-slate-400 mt-1">Docker Compose • Multi-Stage</p>
          </div>
          <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between">
              <span>CI Pipeline:</span>
              <span className="font-mono text-slate-200">GitHub Actions</span>
            </div>
            <div className="flex justify-between">
              <span>Logging:</span>
              <span className="font-mono text-slate-200">Structlog JSON</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Developer Action Grid */}
      <section className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-slate-100">Development Quickstart Commands</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="text-slate-400"># Start complete Docker Compose stack</div>
            <div className="text-emerald-400 font-bold">docker compose up --build</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="text-slate-400"># Run Alembic Database Migrations</div>
            <div className="text-emerald-400 font-bold">cd backend &amp;&amp; alembic revision --autogenerate -m &quot;init&quot;</div>
          </div>
        </div>
      </section>
    </div>
  );
}
