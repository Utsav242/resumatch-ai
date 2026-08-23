export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/40 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Resumiq AI. Production Platform Foundation.</p>
        <p className="flex items-center gap-2">
          <span>FastAPI</span> • <span>Next.js 16</span> • <span>SQLAlchemy 2.0</span> • <span>PostgreSQL</span>
        </p>
      </div>
    </footer>
  );
}
