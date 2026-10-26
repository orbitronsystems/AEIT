'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Search,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  Check,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MatchCandidate, MatchResult, AgriBusiness } from '@/lib/types';

interface MatchmakingViewProps {
  initialPrompt?: string;
  onSaveLeadFromMatch: (candidate: MatchCandidate, queryContext: string) => void;
  onOpenTradeReadiness: (commodity: string, origin: string, destination: string) => void;
  businesses: AgriBusiness[];
}

export default function MatchmakingView({
  initialPrompt = 'Find potential suppliers of seed potatoes in the Netherlands or Scotland that could supply 27 metric tonnes to Egypt.',
  onSaveLeadFromMatch,
  onOpenTradeReadiness,
  businesses,
}: MatchmakingViewProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedCandidateIds, setSavedCandidateIds] = useState<Record<string, boolean>>({});
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);

  const runMatchmaking = async (customPrompt?: string) => {
    const queryText = customPrompt || prompt;
    if (!queryText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/matchmaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: queryText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to execute matchmaking`);
      }

      const data: MatchResult = await res.json();
      setResult(data);
      if (data.candidates.length > 0) {
        setExpandedCandidateId(data.candidates[0].businessId);
      }
    } catch (err: any) {
      setError(err?.message || 'Error executing AI matchmaking request.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let ignore = false;
    const fetchInitial = async () => {
      if (!initialPrompt) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/matchmaking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: initialPrompt }),
        });
        if (!res.ok) throw new Error('Failed to run initial matchmaking');
        const data: MatchResult = await res.json();
        if (!ignore) {
          setResult(data);
          if (data.candidates.length > 0) {
            setExpandedCandidateId(data.candidates[0].businessId);
          }
        }
      } catch (err: any) {
        if (!ignore) {
          setError(err?.message || 'Error executing AI matchmaking request.');
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
  }, [initialPrompt]);

  const handleSave = (candidate: MatchCandidate) => {
    onSaveLeadFromMatch(candidate, result?.extractedIntent || prompt);
    setSavedCandidateIds((prev) => ({ ...prev, [candidate.businessId]: true }));
  };

  return (
    <div className="space-y-6 py-2 font-sans text-[#14100c]">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 luxury-card-shadow space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0f5a28]">
          <Cpu className="h-4 w-4" />
          <span>Explainable AI Agricultural Matching & Sourcing Terminal</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#14100c] tracking-tight">
          Explainable Sourcing & Partner Matching Engine
        </h1>
        <p className="text-xs text-[#5c5246] max-w-3xl leading-relaxed">
          Evidence-grounded matchmaking powered by server-side Gemini intelligence. The engine parses product specifications, intended use (seed vs consumption), quantities, Incoterms, and biosecurity regulations. It explains exactly why candidates qualify and highlights missing information before any commercial inquiry is dispatched.
        </p>
      </div>

      {/* Query Command Console */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'Find suppliers of certified seed potatoes in Netherlands or Scotland for 27 MT to Egypt'..."
              className="w-full rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#14100c] placeholder-[#a89f91] outline-none focus:border-[#d4af37] font-medium luxury-card-shadow"
            />
          </div>
          <button
            onClick={() => runMatchmaking()}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] border border-[#d4af37]/30 px-6 py-3 text-xs font-bold text-white transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer shadow-md"
          >
            {loading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Evaluating Criteria...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#f3e6c4]" />
                <span>Run AI Matching</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Benchmark Scenarios */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#5c5246] font-mono">
          <span className="text-[#78716c] text-[11px] font-bold">Trade Scenarios:</span>
          {[
            {
              label: 'Seed Potatoes (NL / Scot → Egypt)',
              query: 'Find potential suppliers of seed potatoes in the Netherlands or Scotland that could supply 27 metric tonnes to Egypt.',
            },
            {
              label: 'Precision Drip & Solar Pumping',
              query: 'Find manufacturers of heavy-wall drip irrigation systems and solar pumps with export capability for North African desert soil.',
            },
            {
              label: 'Valencia Oranges (South Africa → Rotterdam)',
              query: 'Find fresh Valencia citrus exporters with PPECB cold-chain certification shipping to Rotterdam.',
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(item.query);
                runMatchmaking(item.query);
              }}
              className="rounded-xl border border-[#e2d9cd] bg-[#fbf9f5] px-3 py-1 text-xs text-[#5c5246] font-semibold hover:text-[#14100c] hover:bg-[#f0ece1] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-2xl border border-[#fca5a5] bg-[#fef2f2] p-4 text-xs text-[#991b1b] flex items-center gap-2 font-bold">
          <AlertTriangle className="h-4 w-4 text-[#dc2626] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="rounded-3xl border border-[#e2d9cd] bg-white p-10 text-center space-y-3 luxury-card-shadow">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#bbf7d0] text-[#0f5a28]">
            <Cpu className="h-6 w-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#14100c]">
              Evaluating Agribusiness Candidates Against Trade Constraints...
            </h3>
            <p className="text-xs text-[#5c5246] max-w-md mx-auto">
              Auditing certified lot availability, HS classification, quarantine protocols, and minimum container order quantities.
            </p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Extracted Intent Summary Box */}
          <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0ece1] pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#0f5a28]" />
                <h3 className="text-xs font-mono font-bold text-[#14100c] uppercase">
                  Parsed Sourcing Criteria & Constraints
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#78716c] font-bold">
                Reasoning Model: {result.reasoningEngine}
              </span>
            </div>

            <p className="text-xs text-[#14100c] font-mono italic bg-[#fbf9f5] p-3.5 rounded-2xl border border-[#e2d9cd] font-semibold">
              &ldquo;{result.extractedIntent}&rdquo;
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="rounded-2xl bg-[#fbf9f5] p-3 border border-[#e2d9cd]">
                <span className="text-[10px] uppercase text-[#78716c] font-bold">Commodity:</span>
                <p className="font-bold text-[#14100c] mt-0.5 truncate">{result.query.commodity}</p>
              </div>
              <div className="rounded-2xl bg-[#fbf9f5] p-3 border border-[#e2d9cd]">
                <span className="text-[10px] uppercase text-[#78716c] font-bold">Quantity & Unit:</span>
                <p className="font-bold text-[#14100c] mt-0.5 tabular-nums">
                  {result.query.quantity} {result.query.unit}
                </p>
              </div>
              <div className="rounded-2xl bg-[#fbf9f5] p-3 border border-[#e2d9cd]">
                <span className="text-[10px] uppercase text-[#78716c] font-bold">Origin Corridor:</span>
                <p className="font-bold text-[#14100c] mt-0.5 truncate">{result.query.origin || 'Flexible'}</p>
              </div>
              <div className="rounded-2xl bg-[#fbf9f5] p-3 border border-[#e2d9cd]">
                <span className="text-[10px] uppercase text-[#78716c] font-bold">Destination:</span>
                <p className="font-bold text-[#14100c] mt-0.5 truncate">{result.query.destination || 'Flexible'}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#f0ece1]">
              <span className="text-xs text-[#5c5246] font-medium">
                Inspect phytosanitary quarantine certificates and import license requirements:
              </span>
              <button
                onClick={() =>
                  onOpenTradeReadiness(
                    result.query.commodity,
                    result.query.origin || 'Netherlands',
                    result.query.destination || 'Egypt'
                  )
                }
                className="text-xs font-bold text-[#0f5a28] hover:text-[#166534] flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Trade Desk Clearance</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Ranked Candidates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-[#14100c] tracking-tight">
                Ranked & Qualified Agribusiness Candidates ({result.candidates.length})
              </h2>
              <span className="text-xs font-mono text-[#78716c] font-semibold">
                Sorted by Explainable Compatibility Index
              </span>
            </div>

            <div className="space-y-4">
              {result.candidates.map((cand, idx) => {
                const isExpanded = expandedCandidateId === cand.businessId;
                const isSaved = !!savedCandidateIds[cand.businessId];

                return (
                  <div
                    key={cand.businessId}
                    className="rounded-3xl border border-[#e2d9cd] bg-white p-6 luxury-card-shadow space-y-3.5 transition-all hover:border-[#0f5a28]/60 hover:shadow-xl"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f7f2] text-sm font-black font-mono text-[#0f5a28] border border-[#bbf7d0]">
                          0{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-[#14100c]">
                              {cand.businessName}
                            </h3>
                            <span className="font-mono text-[10px] text-[#5c5246] bg-[#fbf9f5] border border-[#e2d9cd] px-2 py-0.5 rounded-md font-bold">
                              {cand.country}
                            </span>
                          </div>
                          <p className="text-xs text-[#0f5a28] font-bold mt-0.5">
                            {cand.subCategory}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end font-mono">
                            <span className="text-lg font-black text-[#0f5a28] tabular-nums">
                              {cand.matchScore}%
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider font-bold">
                            Match Index
                          </span>
                        </div>

                        <button
                          onClick={() => handleSave(cand)}
                          className={`rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0]'
                              : 'border border-[#c7bbb0] bg-white text-[#5c5246] hover:text-[#14100c] hover:bg-[#fbf9f5]'
                          }`}
                          title="Save Lead to Workspace"
                        >
                          {isSaved ? <Check className="h-3.5 w-3.5 text-[#0f5a28]" /> : <Bookmark className="h-3.5 w-3.5" />}
                        </button>

                        <button
                          onClick={() =>
                            setExpandedCandidateId(isExpanded ? null : cand.businessId)
                          }
                          className="rounded-xl border border-[#c7bbb0] bg-white p-2 text-[#5c5246] hover:text-[#14100c] hover:bg-[#fbf9f5] transition-colors cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Match Rationale */}
                    <div className="rounded-2xl bg-[#f0f7f2] p-3.5 border border-[#bbf7d0] text-xs text-[#14100c] leading-relaxed font-medium">
                      <strong className="text-[#14532d] font-bold">Match Rationale: </strong>
                      {cand.matchRationale}
                    </div>

                    {/* Collapsible Diligence Sections */}
                    {isExpanded && (
                      <div className="space-y-3.5 pt-3 border-t border-[#f0ece1] text-xs">
                        {/* Satisfied Requirements */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#0f5a28] flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#0f5a28]" /> Satisfied Requirements:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {cand.satisfiedRequirements.map((req, rIdx) => (
                              <li
                                key={rIdx}
                                className="flex items-start gap-2 text-[#14100c] bg-[#fbf9f5] p-3 rounded-2xl border border-[#e2d9cd] font-semibold"
                              >
                                <span className="text-[#0f5a28] font-bold">✓</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Missing Information Callout */}
                        {cand.missingInformation && cand.missingInformation.length > 0 && (
                          <div className="space-y-1 rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] p-3.5">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#78716c] flex items-center gap-1.5">
                              <HelpCircle className="h-3.5 w-3.5 text-[#78716c]" /> Pending Diligence Points / Unknowns:
                            </span>
                            <ul className="space-y-1 pt-1 text-[#5c5246] text-xs list-disc list-inside font-medium">
                              {cand.missingInformation.map((m, mIdx) => (
                                <li key={mIdx}>{m}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Risk Flags & Regulatory Constraints */}
                        {cand.riskFlags && cand.riskFlags.length > 0 && (
                          <div className="space-y-1 rounded-2xl border border-[#fde68a] bg-[#fef3c7]/40 p-3.5">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#92400e] flex items-center gap-1.5">
                              <AlertTriangle className="h-3.5 w-3.5 text-[#d97706]" /> Quarantine & Risk Flags:
                            </span>
                            <ul className="space-y-1 pt-1 text-[#78350f] text-xs list-disc list-inside font-semibold">
                              {cand.riskFlags.map((rf, rfIdx) => (
                                <li key={rfIdx}>{rf}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Suggested Diligence Questions for Buyer */}
                        {cand.suggestedQuestions && cand.suggestedQuestions.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#78716c]">
                              Suggested Questions for Buyer Diligence:
                            </span>
                            <div className="space-y-1">
                              {cand.suggestedQuestions.map((sq, sqIdx) => (
                                <div
                                  key={sqIdx}
                                  className="rounded-2xl bg-[#fbf9f5] p-3 text-xs text-[#14100c] border border-[#e2d9cd] italic font-medium"
                                >
                                  &ldquo;{sq}&rdquo;
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommended Next Action */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#fbf9f5] p-3.5 rounded-2xl border border-[#e2d9cd]">
                          <div className="text-xs">
                            <span className="text-[#5c5246]">Recommended Next Step: </span>
                            <strong className="text-[#14100c] font-black">{cand.nextAction}</strong>
                          </div>
                          <button
                            onClick={() => handleSave(cand)}
                            className="whitespace-nowrap rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
                          >
                            {isSaved ? 'Saved in Pipeline' : 'Save as Lead & Draft Inquiry'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
