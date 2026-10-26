import Link from 'next/link';
import { Compass, Home, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            404 • Resource Not Located
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Trade Pathway Not Found
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The agricultural record, trade corridor, or event dossier you requested does not exist or has been archived under our provenance policy.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Home className="w-4 h-4" />
            Return to AEIT Terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
