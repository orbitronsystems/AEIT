'use client';

import React, { useState, useEffect } from 'react';
import {
  Ship,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  ExternalLink,
  HelpCircle,
  Bookmark,
  Check,
  Building,
  RefreshCw,
  Scale,
} from 'lucide-react';
import { TradeReadinessResult } from '@/lib/types';
import TradeVolumeChart from './TradeVolumeChart';

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

  useEffect(() => {
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
    <div className="space-y-6 py-2 font-sans text-[#14100c]">
      {/* Enterprise Header Banner */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 luxury-card-shadow space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0f5a28]">
          <Ship className="h-4 w-4" />
          <span>ARM C — Cross-Border Agricultural Trade & Biosecurity Intelligence</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#14100c] tracking-tight">
          Agricultural Trade Readiness & Regulatory Desk
        </h1>
        <p className="text-xs text-[#5c5246] max-w-3xl leading-relaxed">
          Agricultural trade is governed by sanitary and phytosanitary (SPS) protocols, import quotas, and biosecurity clearances. Commercial availability does not establish legal import eligibility. AEIT verifies national competent authorities, mandatory quarantine screenings, pre-shipment cold-treatment, and documentation requirements.
        </p>
      </div>

      {/* Corridor Configurator */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-4">
        <div className="flex items-center justify-between border-b border-[#f0ece1] pb-3">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-[#0f5a28]" />
            <h3 className="text-xs font-mono font-bold text-[#14100c] tracking-wide uppercase">
              Bilateral Corridor Parameters
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#78716c] font-semibold">
            AEIT Biosecurity Engine v4.2
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[#5c5246] font-bold mb-1">
              Commodity / Botanical Variety
            </label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              placeholder="e.g. Seed Potatoes (Solanum tuberosum)"
              className="w-full rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] px-3.5 py-2.5 text-[#14100c] outline-none focus:border-[#d4af37] font-mono text-xs luxury-card-shadow"
            />
          </div>

          <div>
            <label className="block text-[#5c5246] font-bold mb-1">Origin Country / Port</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Netherlands, Scotland, South Africa..."
              className="w-full rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] px-3.5 py-2.5 text-[#14100c] outline-none focus:border-[#d4af37] font-mono text-xs luxury-card-shadow"
            />
          </div>

          <div>
            <label className="block text-[#5c5246] font-bold mb-1">Destination Country / Port</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Egypt, UAE, Netherlands..."
              className="w-full rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] px-3.5 py-2.5 text-[#14100c] outline-none focus:border-[#d4af37] font-mono text-xs luxury-card-shadow"
            />
          </div>

          <div>
            <label className="block text-[#5c5246] font-bold mb-1">Regulatory Channel / Use</label>
            <select
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              className="w-full rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] px-3 py-2.5 text-[#14100c] outline-none focus:border-[#d4af37] text-xs font-bold luxury-card-shadow cursor-pointer"
            >
              <option value="Planting / Seed Propagation">Planting / Propagation (Strict SPS)</option>
              <option value="Direct Consumption / Retail">Direct Consumption / Retail</option>
              <option value="Industrial Food Processing">Industrial Food Processing</option>
              <option value="Machinery & Farm Infrastructure">Machinery & Farm Equipment</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#f0ece1]">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-[#78716c] text-[11px] font-bold">Presets:</span>
            <button
              onClick={() => {
                setCommodity('Seed Potatoes (Solanum tuberosum)');
                setOrigin('Netherlands');
                setDestination('Egypt');
                setIntendedUse('Planting / Seed Propagation');
              }}
              className="rounded-xl bg-[#fbf9f5] border border-[#e2d9cd] px-3 py-1 text-xs text-[#5c5246] font-semibold hover:text-[#14100c] hover:bg-[#f0ece1] cursor-pointer"
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
              className="rounded-xl bg-[#fbf9f5] border border-[#e2d9cd] px-3 py-1 text-xs text-[#5c5246] font-semibold hover:text-[#14100c] hover:bg-[#f0ece1] cursor-pointer"
            >
              Citrus (ZA → NL)
            </button>
            <button
              onClick={() => {
                setCommodity('Automated Drip Irrigation Systems');
                setOrigin('Israel');
                setDestination('Egypt (Nile Delta)');
                setIntendedUse('Machinery & Farm Infrastructure');
              }}
              className="rounded-xl bg-[#fbf9f5] border border-[#e2d9cd] px-3 py-1 text-xs text-[#5c5246] font-semibold hover:text-[#14100c] hover:bg-[#f0ece1] cursor-pointer"
            >
              Precision Irrigation (IL → EG)
            </button>
          </div>

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-5 py-2.5 text-xs font-bold text-white transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer shadow-md"
          >
            {loading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Evaluating Biosecurity...</span>
              </>
            ) : (
              <>
                <FileCheck className="h-3.5 w-3.5" />
                <span>Evaluate Trade Readiness</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-[#fca5a5] bg-[#fef2f2] p-4 text-xs text-[#991b1b] flex items-center gap-2 font-bold">
          <AlertTriangle className="h-4 w-4 text-[#dc2626] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-6">
          {/* Header Summary & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#14532d] bg-[#f0f7f2] border border-[#bbf7d0] px-2.5 py-0.5 rounded-md">
                  Estimated HS {result.hsCodeEstimated}
                </span>
                <span className="text-[11px] font-mono text-[#92400e] bg-[#fef3c7] border border-[#fde68a] px-2.5 py-0.5 rounded-md font-bold">
                  {result.intendedUse.includes('Planting') ? 'Phytosanitary Quarantine Rigor' : 'Standard Commercial'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#14100c] pt-1">
                {result.commodity} ({result.origin} → {result.destination})
              </h2>
              <p className="text-xs text-[#5c5246] font-medium">
                Channel: <strong className="text-[#14100c]">{result.intendedUse}</strong> · Evaluated under SPS Sanitary & Phytosanitary Protocol
              </p>
            </div>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                saved
                  ? 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0]'
                  : 'bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] text-white shadow-md'
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#0f5a28]" />
                  <span>Saved to Workspace</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>Save Compliance Dossier</span>
                </>
              )}
            </button>
          </div>

          {/* D3 Historical Volume Trends */}
          <TradeVolumeChart
            commodity={result.commodity}
            origin={result.origin}
            destination={result.destination}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Competent Authorities */}
            <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-3">
              <div className="flex items-center justify-between border-b border-[#f0ece1] pb-2.5">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#0f5a28]" />
                  <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase">
                    Competent Authorities & Registries
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#78716c] font-bold">
                  Primary Feeds
                </span>
              </div>

              <div className="space-y-2.5">
                {result.competentAuthorities.map((auth, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#fbf9f5] p-3.5 border border-[#e2d9cd] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#14100c] text-xs">{auth.name}</span>
                      <span className="font-mono text-[10px] text-[#5c5246] bg-white px-2 py-0.5 rounded-md border border-[#e2d9cd] font-bold">
                        {auth.jurisdiction}
                      </span>
                    </div>
                    <p className="text-[#5c5246] text-xs leading-relaxed font-medium">
                      {auth.role}
                    </p>
                    {auth.officialUrl && (
                      <div className="pt-0.5">
                        <a
                          href={auth.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f5a28] hover:text-[#166534]"
                        >
                          <span>Official Regulatory Portal</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Phytosanitary & Biosecurity Restrictions */}
            <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-3">
              <div className="flex items-center justify-between border-b border-[#f0ece1] pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-[#d97706]" />
                  <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase">
                    Quarantine & Phytosanitary Restrictions
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#d97706] font-bold">
                  Zero Tolerance Pests
                </span>
              </div>

              <div className="space-y-2">
                {result.phytosanitaryRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-2xl border border-[#fde68a] bg-[#fef3c7]/40 p-3.5 text-xs text-[#78350f]"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-semibold">{rule}</span>
                  </div>
                ))}
              </div>

              {/* Tariffs and Customs Watchouts */}
              <div className="pt-2 border-t border-[#f0ece1] space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#a89f91]">
                  Customs, VAT & Advance Filing Watchouts:
                </span>
                <ul className="space-y-1.5 text-xs text-[#5c5246]">
                  {result.tariffsAndCustomsWatchouts.map((watchout, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-[#fbf9f5] p-3 rounded-2xl border border-[#e2d9cd] font-medium"
                    >
                      <span className="text-[#0f5a28] font-bold">•</span>
                      <span className="leading-relaxed">{watchout}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Documentation Checklist */}
          <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-3">
            <div className="flex items-center justify-between border-b border-[#f0ece1] pb-2.5">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[#0f5a28]" />
                <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase">
                  Mandatory & Recommended Documentation Checklist
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#78716c] font-semibold">
                Required Prior to Bill of Lading
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#e2d9cd] bg-[#fbf9f5] text-[#5c5246] uppercase text-[10px] font-mono font-bold tracking-wider">
                    <th className="py-2.5 px-3">Document Name</th>
                    <th className="py-2.5 px-3">Issuer Authority</th>
                    <th className="py-2.5 px-3">Requirement Tier</th>
                    <th className="py-2.5 px-3">Operational Scope & Inspection Trigger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece1] text-[#14100c]">
                  {result.documentationChecklist.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-[#fcfbf9] transition-colors">
                      <td className="py-3 px-3 font-bold text-[#14100c]">
                        {doc.documentName}
                      </td>
                      <td className="py-3 px-3 text-[#5c5246] font-mono text-[11px] font-semibold">{doc.issuer}</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            doc.mandatory
                              ? 'bg-[#fef2f2] text-[#991b1b] border border-[#fca5a5]'
                              : 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                          }`}
                        >
                          {doc.mandatory ? 'Mandatory' : 'Conditional'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#5c5246] text-xs max-w-md leading-relaxed font-medium">
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
            <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-2.5">
              <div className="flex items-center gap-2 border-b border-[#f0ece1] pb-2">
                <HelpCircle className="h-4 w-4 text-[#78716c]" />
                <h4 className="text-xs font-mono font-bold uppercase text-[#14100c]">
                  Unresolved Legal / Commercial Questions
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-[#5c5246]">
                {result.unresolvedQuestions.map((q, idx) => (
                  <li
                    key={idx}
                    className="bg-[#fbf9f5] p-3.5 rounded-2xl border border-[#e2d9cd] italic leading-relaxed text-[#14100c] font-medium"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-2.5">
              <div className="flex items-center gap-2 border-b border-[#f0ece1] pb-2">
                <CheckCircle2 className="h-4 w-4 text-[#0f5a28]" />
                <h4 className="text-xs font-mono font-bold uppercase text-[#0f5a28]">
                  Recommended Practical Next Steps
                </h4>
              </div>
              <ol className="space-y-1.5 text-xs text-[#14100c]">
                {result.recommendedNextSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-[#fbf9f5] p-3.5 rounded-2xl border border-[#e2d9cd]"
                  >
                    <span className="font-mono text-[#0f5a28] font-bold text-xs shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed font-semibold">{step}</span>
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
