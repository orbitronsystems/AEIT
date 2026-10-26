'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  Database,
  GitMerge,
  AlertTriangle,
  CheckCircle2,
  Split,
  Activity,
  Terminal,
  Cpu,
  FileSpreadsheet,
} from 'lucide-react';
import { IngestionRun } from '@/lib/types';
import { DeduplicationCandidate, SEED_INGESTION_RUNS, SEED_DEDUP_QUEUE } from '@/lib/data/ingestion';

export default function AdminView() {
  const [runs, setRuns] = useState<IngestionRun[]>(SEED_INGESTION_RUNS);
  const [queue, setQueue] = useState<DeduplicationCandidate[]>(SEED_DEDUP_QUEUE);
  const [triggering, setTriggering] = useState(false);
  const [selectedSource, setSelectedSource] = useState('NAK Dutch Seed Potato Inspection Feed');
  const [recentActionMsg, setRecentActionMsg] = useState<string | null>(null);

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
    setRecentActionMsg(null);
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
        setRecentActionMsg(`Successfully triggered ingestion for "${selectedSource}". Ingested ${data.run.recordsDiscovered} records.`);
      }
    } catch (err) {
      console.error('Trigger ingestion failed:', err);
      setRecentActionMsg('Ingestion trigger failed. Check server logs.');
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
        setRecentActionMsg(`Conflict candidate resolved: Marked as "${resolution}".`);
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
    <div className="space-y-6 py-2 font-sans text-[#14100c]">
      {/* Enterprise Header Banner */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 luxury-card-shadow space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#d97706]">
          <Terminal className="h-4 w-4" />
          <span>Data Governance & Provenance Ledger · Master Architecture</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#14100c] tracking-tight">
          Authoritative Ingestion & Cryptographic Ledger
        </h1>
        <p className="text-xs text-[#5c5246] max-w-3xl leading-relaxed">
          Administer authoritative public-source ingestion pipelines, verify SHA-256 batch hashes, and adjudicate entity ambiguity. Under the AEIT Constitution, source-reported claims never silently overwrite primary government records.
        </p>
      </div>

      {recentActionMsg && (
        <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0f7f2] p-4 text-xs text-[#14532d] flex items-center justify-between gap-3 font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0f5a28] shrink-0" />
            <span>{recentActionMsg}</span>
          </div>
          <button
            onClick={() => setRecentActionMsg(null)}
            className="text-[#5c5246] hover:text-[#14100c] cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Terminal KPI Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
        <div className="rounded-2xl border border-[#e2d9cd] bg-white p-4 space-y-1 luxury-card-shadow">
          <div className="flex items-center justify-between text-xs text-[#78716c] font-bold">
            <span>Discovered Records</span>
            <Database className="h-3.5 w-3.5 text-[#a89f91]" />
          </div>
          <p className="text-2xl font-black text-[#14100c] tabular-nums">{totalDiscovered.toLocaleString()}</p>
          <span className="text-[11px] text-[#0f5a28] font-sans font-bold">4 Primary Registries</span>
        </div>

        <div className="rounded-2xl border border-[#e2d9cd] bg-white p-4 space-y-1 luxury-card-shadow">
          <div className="flex items-center justify-between text-xs text-[#78716c] font-bold">
            <span>Verified & Published</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0f5a28]" />
          </div>
          <p className="text-2xl font-black text-[#0f5a28] tabular-nums">{totalAccepted.toLocaleString()}</p>
          <span className="text-[11px] text-[#5c5246] font-sans font-medium">Passed Phytosanitary Check</span>
        </div>

        <div className="rounded-2xl border border-[#e2d9cd] bg-white p-4 space-y-1 luxury-card-shadow">
          <div className="flex items-center justify-between text-xs text-[#78716c] font-bold">
            <span>Duplicates Resolved</span>
            <GitMerge className="h-3.5 w-3.5 text-[#d97706]" />
          </div>
          <p className="text-2xl font-black text-[#d97706] tabular-nums">{totalDuplicates}</p>
          <span className="text-[11px] text-[#5c5246] font-sans font-medium">Deterministic Rules</span>
        </div>

        <div className="rounded-2xl border border-[#e2d9cd] bg-white p-4 space-y-1 luxury-card-shadow">
          <div className="flex items-center justify-between text-xs text-[#78716c] font-bold">
            <span>Quarantined Records</span>
            <AlertTriangle className="h-3.5 w-3.5 text-[#dc2626]" />
          </div>
          <p className="text-2xl font-black text-[#dc2626] tabular-nums">{totalQuarantined}</p>
          <span className="text-[11px] text-[#991b1b] font-sans font-bold">Pending Biosecurity Review</span>
        </div>
      </div>

      {/* Ingestion Trigger Console */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-5 space-y-3 luxury-card-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#0f5a28]" />
              <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase tracking-wider">
                Authoritative Upstream Registry Ingestion
              </h3>
            </div>
            <p className="text-xs text-[#5c5246] mt-0.5">
              Synchronize records from approved phytosanitary registries, seed certification authorities, and DLG event directories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] px-3.5 py-2 text-xs text-[#14100c] font-bold outline-none focus:border-[#d4af37] font-mono luxury-card-shadow cursor-pointer"
            >
              <option value="NAK Dutch Seed Potato Inspection Feed">NAK Dutch Inspection Feed</option>
              <option value="SASA Scottish Seed Potato Scheme (SPCS)">SASA Scottish Scheme</option>
              <option value="DLG Agritechnica Exhibitor Database">DLG Agritechnica Feed</option>
              <option value="CAPQ Egypt Plant Quarantine Registry">CAPQ Egypt Registry</option>
            </select>

            <button
              onClick={triggerIngestion}
              disabled={triggering}
              className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-4 py-2 text-xs font-bold text-white transition-colors disabled:opacity-50 cursor-pointer shadow-md"
            >
              {triggering ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Harvesting...</span>
                </>
              ) : (
                <>
                  <Activity className="h-3.5 w-3.5" />
                  <span>Execute Ingestion Job</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Deduplication & Conflict Resolution Queue */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 space-y-4 luxury-card-shadow">
        <div className="flex items-center justify-between border-b border-[#f0ece1] pb-2.5">
          <div className="flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-[#d97706]" />
            <div>
              <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase">
                Corporate Entity Resolution & Deduplication Queue
              </h3>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#92400e] bg-[#fef3c7] border border-[#fde68a] px-2.5 py-0.5 rounded-md font-bold">
            {queue.filter((q) => q.status === 'Pending Review').length} In Adjudication
          </span>
        </div>

        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] p-4 space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e2d9cd] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#5c5246] font-mono text-[11px]">
                    Conflicting Attribute: <strong className="text-[#d97706]">{item.conflictingField}</strong>
                  </span>
                  <span className="font-mono text-[10px] text-[#5c5246] bg-white border border-[#e2d9cd] px-2 py-0.5 rounded-md font-bold">
                    Confidence: {(item.similarityScore * 100).toFixed(0)}%
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                    item.status === 'Pending Review'
                      ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                      : 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0]'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#14100c]">
                <div className="rounded-2xl bg-white p-3.5 border border-[#e2d9cd] space-y-1">
                  <span className="text-[10px] font-mono text-[#78716c] uppercase font-bold tracking-wider">
                    Authoritative Master Record:
                  </span>
                  <p className="font-bold text-[#14100c] text-xs">{item.primaryEntity}</p>
                  <p className="text-xs text-[#0f5a28] font-mono font-bold mt-0.5">{item.primaryValue}</p>
                </div>

                <div className="rounded-2xl bg-white p-3.5 border border-[#e2d9cd] space-y-1">
                  <span className="text-[10px] font-mono text-[#78716c] uppercase font-bold tracking-wider">
                    Incoming Ingestion Candidate:
                  </span>
                  <p className="font-bold text-[#14100c] text-xs">{item.incomingEntity}</p>
                  <p className="text-xs text-[#d97706] font-mono font-bold mt-0.5">{item.incomingValue}</p>
                </div>
              </div>

              {item.status === 'Pending Review' && (
                <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={() => handleResolveDedup(item.id, 'Separated')}
                    className="flex items-center gap-1.5 rounded-xl border border-[#c7bbb0] bg-white px-3.5 py-1.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] cursor-pointer"
                  >
                    <Split className="h-3 w-3 text-[#78716c]" />
                    <span>Preserve as Separate Entities</span>
                  </button>
                  <button
                    onClick={() => handleResolveDedup(item.id, 'Merged')}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-3.5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
                  >
                    <GitMerge className="h-3 w-3" />
                    <span>Merge Records (Same Entity)</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Provenance Ledger Table */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 space-y-3 luxury-card-shadow">
        <div className="flex items-center justify-between border-b border-[#f0ece1] pb-2.5">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-[#0f5a28]" />
            <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase">
              Ingestion Runs & Cryptographic Provenance Ledger
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#78716c] font-bold">
            Immutable Audit Trail
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#e2d9cd] bg-[#fbf9f5] text-[#5c5246] uppercase text-[10px] font-mono font-bold tracking-wider">
                <th className="py-2.5 px-3">Batch & Source</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 font-mono">Discovered</th>
                <th className="py-2.5 px-3 font-mono">Accepted</th>
                <th className="py-2.5 px-3 font-mono">Quarantined</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">SHA-256 Batch Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece1] text-[#14100c]">
              {runs.map((r) => (
                <tr key={r.id} className="hover:bg-[#fcfbf9] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#14100c]">{r.sourceName}</div>
                    <span className="text-[10px] text-[#78716c] font-mono font-medium">{r.id}</span>
                  </td>
                  <td className="py-3 px-3 text-[#5c5246] text-[11px] font-medium">{r.sourceType}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#14100c] tabular-nums">{r.recordsDiscovered}</td>
                  <td className="py-3 px-3 font-mono text-[#0f5a28] font-bold tabular-nums">{r.recordsAccepted}</td>
                  <td className="py-3 px-3 font-mono text-[#dc2626] font-bold tabular-nums">{r.quarantinedCount}</td>
                  <td className="py-3 px-3 text-[#78716c] font-mono text-[11px] font-medium">{r.runDate}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[10px] font-bold bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0] px-2 py-0.5 rounded-md">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-[#5c5246]">
                    <span className="bg-[#fbf9f5] px-2 py-0.5 rounded-md border border-[#e2d9cd] font-semibold">
                      {r.auditHash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
