'use client';

import React, { useState } from 'react';
import {
  Ship,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Bookmark,
  Check,
  Building,
  RefreshCw,
  Scale,
  Sparkles,
} from 'lucide-react';
import { TradeReadinessResult } from '@/lib/types';

interface TradeDeskViewProps {
  initialCommodity?: string;
  initialOrigin?: string;
  initialDestination?: string;
  onSaveCorridorToWorkspace: (result: TradeReadinessResult) => void;
}

export default function TradeDeskView({
  initialCommodity = 'Seed Potatoes (Solanum tuberosum)',
  initialOrigin = 'Netherlands',
  initialDestination = 'Egypt',
  onSaveCorridorToWorkspace,
}: TradeDeskViewProps) {
  const [commodity, setCommodity] = useState(initialCommodity);
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [intendedUse, setIntendedUse] = useState('Planting / Seed Propagation');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TradeReadinessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch('/api/trade-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commodity,
          origin,
          destination,
          intendedUse,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to analyze corridor`);
      }

      const data: TradeReadinessResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Error processing trade readiness analysis.');
    } finally {
      setLoading(false);
    }
  };

  // Run initial analysis on mount
  React.useEffect(() => {
    let ignore = false;
    const fetchInitial = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/trade-readiness', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commodity,
            origin,
            destination,
            intendedUse,
          }),
        });
        if (!res.ok) throw new Error('Failed to analyze corridor');
        const data: TradeReadinessResult = await res.json();
        if (!ignore) {
          setResult(data);
        }
      } catch (err: any) {
        if (!ignore) {
          setError(err?.message || 'Error processing trade readiness analysis.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    fetchInitial();
    return () => {
      ignore = true;
    };
  }, [commodity, destination, intendedUse, origin]);

  const handleSave = () => {
    if (result) {
      onSaveCorridorToWorkspace(result);
      setSaved(true);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Banner */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Ship className="h-4 w-4" />
          <span>ARM C & Phase 7 — Cross-Border Trade-Readiness Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Bilateral Agricultural Trade & Regulatory Desk
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Agricultural trade is heavily regulated. A product’s commercial availability does not guarantee legal entry. This engine identifies competent biosecurity authorities, phytosanitary quarantine restrictions, advance cargo declarations, and document requirements.
        </p>
      </div>

      {/* Corridor Configurator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Scale className="h-4 w-4 text-emerald-400" />
          <span>Configure Bilateral Agricultural Corridor</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Commodity / Crop</label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              placeholder="e.g. Seed Potatoes, Fresh Citrus..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Origin Country</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Netherlands, Scotland, South Africa..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Destination Country</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Egypt, UAE, Netherlands..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Intended Use</label>
            <select
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
            >
              <option value="Planting / Seed Propagation">Planting / Seed Propagation (Regulated)</option>
              <option value="Direct Consumption / Retail">Direct Consumption / Retail</option>
              <option value="Industrial Food Processing">Industrial Food Processing</option>
              <option value="Machinery & Farm Infrastructure">Machinery & Farm Infrastructure</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Quick Corridor Presets:</span>
            <button
              onClick={() => {
                setCommodity('Seed Potatoes');
                setOrigin('Netherlands');
                setDestination('Egypt');
                setIntendedUse('Planting / Seed Propagation');
              }}
              className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 hover:text-white"
            >
              Seed Potatoes (NL → EG)
            </button>
            <button
              onClick={() => {
                setCommodity('Valencia Fresh Oranges');
                setOrigin('South Africa');
                setDestination('Netherlands (Rotterdam)');
                setIntendedUse('Direct Consumption / Retail');
              }}
              className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 hover:text-white"
            >
              Citrus (ZA → NL)
            </button>
          </div>

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Checking Regulations...</span>
              </>
            ) : (
              <>
                <FileCheck className="h-4 w-4" />
                <span>Evaluate Trade Readiness</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-6">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div>
              <span className="rounded bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                HS Classification: {result.hsCodeEstimated}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {result.commodity} ({result.origin} → {result.destination})
              </h2>
              <p className="text-xs text-slate-400">
                Intended Regulatory Channel: <strong className="text-slate-300">{result.intendedUse}</strong>
              </p>
            </div>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                saved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Saved to Workspace</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span>Save Compliance Checklist</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Competent Authorities */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="h-4 w-4 text-emerald-400" />
                <span>Competent Regulatory Authorities to Consult</span>
              </h3>
              <div className="space-y-3">
                {result.competentAuthorities.map((auth, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-slate-950/70 p-3 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{auth.name}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                        {auth.jurisdiction}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {auth.role}
                    </p>
                    {auth.officialUrl && (
                      <a
                        href={auth.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline pt-1"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Phytosanitary & Biosecurity Restrictions */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                <span>Phytosanitary & Quarantine Biosecurity Rules</span>
              </h3>
              <div className="space-y-2">
                {result.phytosanitaryRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/90"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>

              {/* Tariffs and Customs Watchouts */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Customs, VAT & Advance Filing Watchouts:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {result.tariffsAndCustomsWatchouts.map((watchout, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{watchout}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Documentation Checklist */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-emerald-400" />
              <span>Mandatory & Recommended Documentation Checklist</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">Document Name</th>
                    <th className="py-2.5 px-3">Issuer Authority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Operational Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {result.documentationChecklist.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-white">
                        {doc.documentName}
                      </td>
                      <td className="py-3 px-3 text-slate-400">{doc.issuer}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                            doc.mandatory
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {doc.mandatory ? 'Mandatory' : 'Conditional'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300 text-[11px] max-w-md">
                        {doc.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Unresolved Questions & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span>Unresolved Legal / Operational Questions</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {result.unresolvedQuestions.map((q, idx) => (
                  <li key={idx} className="bg-slate-950 p-2.5 rounded border border-slate-800 italic">
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Recommended Practical Next Steps</span>
              </h4>
              <ol className="space-y-1.5 text-xs text-slate-200 list-decimal list-inside">
                {result.recommendedNextSteps.map((step, idx) => (
                  <li key={idx} className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
