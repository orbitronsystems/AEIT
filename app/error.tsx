'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime exception for diagnostics
    console.error('AEIT Intelligence Runtime Exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-slate-900/60 border border-rose-900/30 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-white">
            System Synchronization Anomaly
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The platform encountered an unexpected state while evaluating agricultural intelligence data. Our telemetry logs have isolated the discrepancy.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-500 bg-slate-950/60 p-2 rounded border border-slate-800">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Query
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors border border-slate-700"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
