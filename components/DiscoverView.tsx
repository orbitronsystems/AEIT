'use client';

import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Ship,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Flame,
  Globe2,
  FileCheck,
  Droplets,
  Tractor,
} from 'lucide-react';
import { AgriBusiness, AgriEvent } from '@/lib/types';
import { NavTab } from './Header';

interface DiscoverViewProps {
  businesses: AgriBusiness[];
  events: AgriEvent[];
  onNavigate: (tab: NavTab) => void;
  onLaunchMatchmaking: (prompt: string) => void;
  onSelectBusiness: (biz: AgriBusiness) => void;
  onSelectEvent: (evt: AgriEvent) => void;
}

export default function DiscoverView({
  businesses,
  events,
  onNavigate,
  onLaunchMatchmaking,
  onSelectBusiness,
  onSelectEvent,
}: DiscoverViewProps) {
  const [searchPrompt, setSearchPrompt] = useState('');

  const sampleScenarios = [
    {
      title: 'Certified Seed Potatoes to Egypt',
      query: 'Find potential suppliers of seed potatoes in the Netherlands or Scotland that could supply 27 metric tonnes to Egypt.',
      tag: 'Seed & Tubers',
      arm: 'ARM A + ARM C',
    },
    {
      title: 'Precision Drip & Solar Pumping',
      query: 'Find manufacturers of heavy-wall pressure-compensating drip irrigation lines with export capacity for desert reclamation in North Africa.',
      tag: 'Irrigation & Machinery',
      arm: 'ARM A',
    },
    {
      title: 'Citrus Export from South Africa to EU',
      query: 'Find accredited export growers of Valencia oranges with PPECB quality control and GlobalGAP certification shipping from Port of Cape Town to Rotterdam.',
      tag: 'Fresh Produce Export',
      arm: 'ARM B + ARM C',
    },
    {
      title: 'Farmland Lease with Water Permitting',
      query: 'Find verified agricultural land lease opportunities with operational deep wells and pivot infrastructure in Egypt or North Africa.',
      tag: 'Land & Infrastructure',
      arm: 'ARM B',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPrompt.trim()) {
      onLaunchMatchmaking(searchPrompt);
    }
  };

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AEIT Multi-Arm Agricultural Intelligence & Matchmaking</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Connect Global Agribusiness With <span className="text-emerald-400">Explainable AI</span> & Provenance.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Overcoming information, discovery, and regulatory trust barriers. AEIT connects agricultural machinery manufacturers, seed breeders, commercial growers, commodity exporters, and international trade expo delegates through verifiable evidence and explainable matchmaking.
          </p>

          {/* Interactive AI Sourcing Search Box */}
          <form onSubmit={handleSearchSubmit} className="mt-6">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/90 p-2 shadow-2xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
              <div className="flex items-center pl-3 text-slate-400">
                <Search className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Ask AEIT AI: 'Find suppliers of seed potatoes in Netherlands or Scotland for 27 MT to Egypt'..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-emerald-400 transition-colors"
              >
                <span>Run AI Match</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Preset Prompts / Scenarios */}
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Tested Corridors & Benchmarks:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleScenarios.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => onLaunchMatchmaking(sc.query)}
                  className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800 transition-all text-left"
                >
                  <span className="font-medium group-hover:text-emerald-300">{sc.title}</span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 border border-slate-700/60">
                    {sc.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Four Agricultural Trade Arms Grid */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                The Four Connected Agricultural Trade Arms
              </h2>
              <p className="text-sm text-slate-400">
                AEIT structures global agribusiness intelligence across four unified commercial domains.
              </p>
            </div>
            <button
              onClick={() => onNavigate('businesses')}
              className="hidden sm:flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              Explore Full Directory <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Arm A */}
          <div
            onClick={() => onNavigate('businesses')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
              <Tractor className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">ARM A</span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300">
                Machinery & Input Suppliers
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Harvesting machinery, pressure-compensating drip irrigation, high-health seed breeders, greenhouse automation, and bio-fertilizers.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>NAK, SASA, DLG Tested Standards</span>
            </div>
          </div>

          {/* Arm B */}
          <div
            onClick={() => onNavigate('businesses')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">ARM B</span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300">
                Producers & Land Opportunities
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Commercial growers, farming cooperatives, nurseries, contract farming outgrower networks, and audited agricultural land leases.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Independent Water & Soil Due Diligence</span>
            </div>
          </div>

          {/* Arm C */}
          <div
            onClick={() => onNavigate('trade-desk')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
              <Ship className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">ARM C</span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300">
                Exporters, Importers & B2B Trade
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-border commodity traders, seed potatoes, citrus, grains, Incoterms (FOB/CIF), phytosanitary biosecurity, and customs permits.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>CAPQ, NVWA, USDA APHIS Rules</span>
            </div>
          </div>

          {/* Arm D */}
          <div
            onClick={() => onNavigate('events')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">ARM D</span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300">
                Expos, Seminars & Conventions
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Agritechnica, Fruit Logistica, Sahara Expo Egypt, NAMPO Harvest Day. Official dates, verified venues, exhibitor catalogues, and registration.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Official Organizer Traceability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events (Arm D) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Upcoming International Agricultural Expos (Arm D)
            </h2>
            <p className="text-xs text-slate-400">
              Grounded in official organizer registrations. No unconfirmed dates or placeholder events.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            View All ({events.length}) <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.slice(0, 3).map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-400 border border-emerald-500/20">
                    {evt.status}
                  </span>
                  <span className="text-slate-400">{evt.city}, {evt.country}</span>
                </div>
                <h3 className="font-bold text-white text-sm line-clamp-2 hover:text-emerald-300">
                  {evt.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>{evt.startDate}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  Inspect Details <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Agribusiness Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Verified Agribusiness Intelligence Spotlight
            </h2>
            <p className="text-xs text-slate-400">
              Direct verification evidence attached to each profile.
            </p>
          </div>
          <button
            onClick={() => onNavigate('businesses')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            Browse All ({businesses.length}) <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.slice(0, 3).map((biz) => (
            <div
              key={biz.id}
              onClick={() => onSelectBusiness(biz)}
              className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    {biz.country}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {biz.verifiedStatus.overallLevel}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base hover:text-emerald-300">
                  {biz.name}
                </h3>
                <p className="text-xs text-emerald-400 font-medium">{biz.subCategory}</p>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {biz.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {biz.certifications.slice(0, 2).map((c, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300"
                    >
                      {c.split('(')[0]}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-400">Provenance: </span>
                  <span className="text-slate-300 italic">{biz.sourceProvenance.sourceName.slice(0, 32)}...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AEIT Trust Standard Banner */}
      <section className="rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <ShieldCheck className="h-5 w-5" />
              <span>AEIT Trust Constitution: Multi-Dimensional Verification</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Trust Is Not a Single Boolean. Every Claim Is Sourced.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AEIT tracks identity, commercial registry filings, laboratory phytosanitary tests, and trade history separately. We never fabricate events, prices, quotas, or customer recommendations. If evidence is missing, it is explicitly flagged as unknown.
            </p>
          </div>
          <button
            onClick={() => onNavigate('admin')}
            className="whitespace-nowrap rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            Inspect Trust & Ingestion Center
          </button>
        </div>
      </section>
    </div>
  );
}
