'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  Check,
  FileCheck,
  Scale,
  RefreshCw,
  ExternalLink,
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

  // Run on initial load if no results yet
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
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Cpu className="h-4 w-4" />
          <span>Phase 6 — Explainable AI Agribusiness Matching Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Explainable AI Sourcing & Partner Matching
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ground-truth evaluation powered by server-side Gemini 3.8 Flash. The engine parses product specifications, intended use (seed vs consumption), quantities, Incoterms, and biosecurity regulations. It explains exactly why candidates qualify and highlights missing information before any commercial inquiry is dispatched.
        </p>
      </div>

      {/* Query Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Find suppliers of certified seed potatoes in Netherlands or Scotland for 27 MT to Egypt'..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => runMatchmaking()}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-md hover:bg-emerald-400 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Reasoning...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run AI Matching</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Benchmark Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Preset Ag-Trade Scenarios:</span>
          {[
            {
              label: 'Seed Potatoes (NL / Scot -> Egypt)',
              query: 'Find potential suppliers of seed potatoes in the Netherlands or Scotland that could supply 27 metric tonnes to Egypt.',
            },
            {
              label: 'Precision Drip & Solar Pumping',
              query: 'Find manufacturers of heavy-wall drip irrigation systems and solar pumps with export capability for North African desert soil.',
            },
            {
              label: 'Valencia Oranges (South Africa -> EU)',
              query: 'Find fresh Valencia citrus exporters with PPECB cold-chain certification shipping to Rotterdam.',
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(item.query);
                runMatchmaking(item.query);
              }}
              className="rounded-md border border-slate-800 bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 animate-pulse border border-emerald-500/30">
            <Cpu className="h-6 w-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">
              AEIT Reasoning Engine Evaluating Agribusiness Candidates...
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Analyzing product classifications, origin export histories, quarantine pest regulations, and verified capacities.
            </p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Extracted Intent Summary Box */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Extracted Sourcing Intent & Parameters
                </h3>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                Engine: {result.reasoningEngine}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              &ldquo;{result.extractedIntent}&rdquo;
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Commodity:</span>
                <p className="font-semibold text-white">{result.query.commodity}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Quantity & Unit:</span>
                <p className="font-semibold text-white">
                  {result.query.quantity} {result.query.unit}
                </p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Origin Corridor:</span>
                <p className="font-semibold text-white">{result.query.origin || 'Flexible'}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Destination:</span>
                <p className="font-semibold text-white">{result.query.destination || 'Flexible'}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Need bilateral quarantine and document guidance for this corridor?
              </span>
              <button
                onClick={() =>
                  onOpenTradeReadiness(
                    result.query.commodity,
                    result.query.origin || 'Netherlands',
                    result.query.destination || 'Egypt'
                  )
                }
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-2"
              >
                <span>Launch Trade-Readiness Desk</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Ranked Candidates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                Ranked & Qualified Candidates ({result.candidates.length})
              </h2>
              <span className="text-xs text-slate-400">
                Ranked by multi-dimensional compatibility
              </span>
            </div>

            <div className="space-y-4">
              {result.candidates.map((cand, idx) => {
                const isExpanded = expandedCandidateId === cand.businessId;
                const isSaved = !!savedCandidateIds[cand.businessId];

                return (
                  <div
                    key={cand.businessId}
                    className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 transition-all hover:border-slate-700 shadow-lg"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-base font-extrabold text-emerald-400 border border-slate-700">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white">
                              {cand.businessName}
                            </h3>
                            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                              {cand.country}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-400 font-medium">
                            {cand.subCategory}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 justify-end">
                            <Scale className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-lg font-black text-emerald-400">
                              {cand.matchScore}%
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                            Match Score
                          </span>
                        </div>

                        <button
                          onClick={() => handleSave(cand)}
                          className={`rounded-lg p-2 text-xs font-medium transition-colors ${
                            isSaved
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                          }`}
                          title="Save Lead to Workspace"
                        >
                          {isSaved ? <Check className="h-4 w-4 text-emerald-400" /> : <Bookmark className="h-4 w-4" />}
                        </button>

                        <button
                          onClick={() =>
                            setExpandedCandidateId(isExpanded ? null : cand.businessId)
                          }
                          className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Match Rationale */}
                    <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80 text-xs text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400 font-semibold">Match Rationale: </strong>
                      {cand.matchRationale}
                    </div>

                    {/* Collapsible Deep Diligence Sections */}
                    {isExpanded && (
                      <div className="space-y-4 pt-2 border-t border-slate-800 text-xs">
                        {/* Satisfied Requirements */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Satisfied Requirements:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {cand.satisfiedRequirements.map((req, rIdx) => (
                              <li
                                key={rIdx}
                                className="flex items-start gap-1.5 text-slate-300 bg-slate-950/40 p-2 rounded border border-slate-800/60"
                              >
                                <span className="text-emerald-400">✓</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Missing Information Callout (Phase 4.1 Requirement) */}
                        {cand.missingInformation && cand.missingInformation.length > 0 && (
                          <div className="space-y-1.5 rounded-lg border border-slate-700/80 bg-slate-950/60 p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <HelpCircle className="h-3.5 w-3.5 text-slate-400" /> Unknown / Missing Information:
                            </span>
                            <ul className="space-y-1">
                              {cand.missingInformation.map((m, mIdx) => (
                                <li key={mIdx} className="text-slate-300 text-[11px] list-disc list-inside">
                                  {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Risk Flags & Regulatory Constraints */}
                        {cand.riskFlags && cand.riskFlags.length > 0 && (
                          <div className="space-y-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" /> Risk Flags & Regulatory Notice:
                            </span>
                            <ul className="space-y-1">
                              {cand.riskFlags.map((rf, rfIdx) => (
                                <li key={rfIdx} className="text-amber-200/90 text-[11px] list-disc list-inside">
                                  {rf}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Suggested Diligence Questions for Buyer */}
                        {cand.suggestedQuestions && cand.suggestedQuestions.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                              Suggested Questions for Buyer Diligence:
                            </span>
                            <div className="space-y-1">
                              {cand.suggestedQuestions.map((sq, sqIdx) => (
                                <div
                                  key={sqIdx}
                                  className="rounded bg-slate-950 p-2 text-[11px] text-slate-300 border border-slate-800 italic"
                                >
                                  &ldquo;{sq}&rdquo;
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommended Next Action */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                          <div className="text-xs">
                            <span className="text-slate-400">Recommended Next Step: </span>
                            <strong className="text-white">{cand.nextAction}</strong>
                          </div>
                          <button
                            onClick={() => handleSave(cand)}
                            className="whitespace-nowrap rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
                          >
                            {isSaved ? 'Saved in Workspace' : 'Save as Lead & Draft Inquiry'}
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
