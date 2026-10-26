'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  Database,
  GitMerge,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  ExternalLink,
  Split,
  FileCheck,
  Activity,
} from 'lucide-react';
import { IngestionRun } from '@/lib/types';
import { DeduplicationCandidate, SEED_INGESTION_RUNS, SEED_DEDUP_QUEUE } from '@/lib/data/ingestion';

export default function AdminView() {
  const [runs, setRuns] = useState<IngestionRun[]>(SEED_INGESTION_RUNS);
  const [queue, setQueue] = useState<DeduplicationCandidate[]>(SEED_DEDUP_QUEUE);
  const [triggering, setTriggering] = useState(false);
  const [selectedSource, setSelectedSource] = useState('NAK Dutch Seed Potato Inspection Feed');

  useEffect(() => {
    let ignore = false;
    const loadFreshData = async () => {
      try {
        const res = await fetch('/api/ingestion');
        const data = await res.json();
        if (!ignore) {
          if (data.runs) setRuns(data.runs);
          if (data.queue) setQueue(data.queue);
        }
      } catch (err) {
        console.error('Failed to load ingestion runs:', err);
      }
    };
    loadFreshData();
    return () => {
      ignore = true;
    };
  }, []);

  const triggerIngestion = async () => {
    setTriggering(true);
    try {
      const res = await fetch('/api/ingestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger_ingestion',
          sourceName: selectedSource,
          sourceType: 'Government Registry',
        }),
      });
      const data = await res.json();
      if (data.run) {
        setRuns((prev) => [data.run, ...prev]);
      }
    } catch (err) {
      console.error('Trigger ingestion failed:', err);
    } finally {
      setTriggering(false);
    }
  };

  const handleResolveDedup = async (candidateId: string, resolution: 'Merged' | 'Separated') => {
    try {
      const res = await fetch('/api/ingestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resolve_dedup',
          candidateId,
          resolution,
        }),
      });
      const data = await res.json();
      if (data.queue) {
        setQueue(data.queue);
      }
    } catch (err) {
      console.error('Dedup resolve failed:', err);
    }
  };

  const totalDiscovered = runs.reduce((acc, r) => acc + r.recordsDiscovered, 0);
  const totalAccepted = runs.reduce((acc, r) => acc + r.recordsAccepted, 0);
  const totalQuarantined = runs.reduce((acc, r) => acc + r.quarantinedCount, 0);
  const totalDuplicates = runs.reduce((acc, r) => acc + r.duplicateCount, 0);

  return (
    <div className="space-y-8 py-4">
      {/* Banner */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Phases 3 & 9 — Data Ingestion Pipeline & Trust Administration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Data Governance, Ingestion & Provenance Audit
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Administer authoritative data feeds, monitor automated ingestion health, audit cryptographic hashes, and resolve corporate deduplication ambiguities. No AI-generated assumption ever silently overwrites verified primary records.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Records Ingested</span>
          <p className="text-2xl font-bold text-white">{totalDiscovered.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-400">From 4 Authorized Feeds</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <span className="text-xs text-slate-400">Verified & Accepted</span>
          <p className="text-2xl font-bold text-emerald-400">{totalAccepted.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400">Passed Schema Validation</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <span className="text-xs text-slate-400">Duplicates Handled</span>
          <p className="text-2xl font-bold text-amber-400">{totalDuplicates}</p>
          <span className="text-[11px] text-slate-400">Deterministic Resolution</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <span className="text-xs text-slate-400">Quarantined for Review</span>
          <p className="text-2xl font-bold text-red-400">{totalQuarantined}</p>
          <span className="text-[11px] text-red-300/80">Missing Mandatory Certs</span>
        </div>
      </div>

      {/* Ingestion Trigger Panel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              <span>Trigger Incremental Source Ingestion</span>
            </h3>
            <p className="text-xs text-slate-400">
              Polls upstream official agricultural registers, normalizes company entries, and applies hash deduplication.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500"
            >
              <option value="NAK Dutch Seed Potato Inspection Feed">NAK Dutch Inspection Feed</option>
              <option value="SASA Scottish Seed Potato Scheme (SPCS)">SASA Scottish Scheme</option>
              <option value="DLG Agritechnica Exhibitor Database">DLG Agritechnica Feed</option>
              <option value="CAPQ Egypt Plant Quarantine Registry">CAPQ Egypt Registry</option>
            </select>

            <button
              onClick={triggerIngestion}
              disabled={triggering}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors"
            >
              {triggering ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Ingesting...</span>
                </>
              ) : (
                <>
                  <Activity className="h-3.5 w-3.5" />
                  <span>Run Job</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Deduplication & Conflict Resolution Queue */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Deduplication & Corporate Entity Resolution Queue
            </h3>
          </div>
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/20">
            {queue.filter((q) => q.status === 'Pending Review').length} Pending Review
          </span>
        </div>

        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="font-semibold text-white">
                  Conflict on: <strong className="text-amber-400">{item.conflictingField}</strong> (Similarity Score: {(item.similarityScore * 100).toFixed(0)}%)
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                    item.status === 'Pending Review'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Primary Existing Record:</span>
                  <p className="font-bold text-white mt-0.5">{item.primaryEntity}</p>
                  <p className="text-[11px] text-emerald-400 mt-1">{item.primaryValue}</p>
                </div>

                <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Incoming Feed Candidate:</span>
                  <p className="font-bold text-white mt-0.5">{item.incomingEntity}</p>
                  <p className="text-[11px] text-amber-300 mt-1">{item.incomingValue}</p>
                </div>
              </div>

              {item.status === 'Pending Review' && (
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleResolveDedup(item.id, 'Separated')}
                    className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200 hover:text-white hover:bg-slate-700"
                  >
                    <Split className="h-3 w-3" />
                    <span>Keep as Separate Entities (Recommended)</span>
                  </button>
                  <button
                    onClick={() => handleResolveDedup(item.id, 'Merged')}
                    className="flex items-center gap-1 rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    <GitMerge className="h-3 w-3" />
                    <span>Merge into Single Profile</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ingestion Runs Log */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-emerald-400" />
          <span>Ingestion Runs & Cryptographic Provenance Ledger</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Run ID & Source</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Discovered</th>
                <th className="py-2.5 px-3">Accepted</th>
                <th className="py-2.5 px-3">Quarantined</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Audit Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {runs.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-white">
                    <div>{r.sourceName}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{r.id}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{r.sourceType}</td>
                  <td className="py-3 px-3">{r.recordsDiscovered}</td>
                  <td className="py-3 px-3 text-emerald-400 font-semibold">{r.recordsAccepted}</td>
                  <td className="py-3 px-3 text-amber-400">{r.quarantinedCount}</td>
                  <td className="py-3 px-3 text-slate-400">{r.runDate}</td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-slate-400">{r.auditHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
