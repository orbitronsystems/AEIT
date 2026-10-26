'use client';

import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Ship,
  ExternalLink,
  Droplets,
  Tractor,
  Award,
  MapPin,
  ChevronRight,
  Landmark,
  Scale,
  Compass,
  FileCheck,
  Sparkles,
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

  const sampleCorridors = [
    {
      title: 'US Bulk Milling Wheat & Grain to MENA/Asia',
      query: 'Find verified grain exporters like ADM in the United States offering Hard Red Winter Wheat 12% protein for 25,000 MT shipments.',
      domain: 'Arm C · Grains & Oilseeds',
      corridor: 'US Gulf (New Orleans) → Alexandria / Tokyo',
      standard: 'USDA FGIS Certified',
      benchmark: '$234 / MT FOB',
    },
    {
      title: 'Kenyan Hass Avocados to Europe & China',
      query: 'Find accredited avocado exporters in Kenya like Kakuzi with KEPHIS pest-free certification shipping to Rotterdam or Shanghai.',
      domain: 'Arm B & C · Superfoods',
      corridor: 'Mombasa → Rotterdam / Shanghai',
      standard: 'KEPHIS · GlobalGAP',
      benchmark: '$4,250 / Reefer',
    },
    {
      title: 'Japanese Paddy Machinery to SE Asia & Africa',
      query: 'Find manufacturers of rice harvesters and compact tractors in Japan like Kubota for tropical paddy field mechanization.',
      domain: 'Arm A · Paddy Mechanization',
      corridor: 'Kobe / Yokohama → Bangkok / Mombasa',
      standard: 'Japan MAFF Approved',
      benchmark: '$24,500 / Unit',
    },
    {
      title: 'Certified Seed Potatoes to Egypt & Mediterranean',
      query: 'Find potential suppliers of seed potatoes in the Netherlands or Scotland that could supply 27 metric tonnes to Egypt.',
      domain: 'Arm A · Tubers & Genetics',
      corridor: 'Rotterdam / Grangemouth → Alexandria',
      standard: 'NAK / SASA Certified',
      benchmark: '€640 / MT CIF',
    },
    {
      title: 'Desert Drip Irrigation & Solar Pumping',
      query: 'Find manufacturers of heavy-wall pressure-compensating drip irrigation lines with export capacity for desert reclamation in North Africa.',
      domain: 'Arm A · Precision Water',
      corridor: 'Haifa / Almería → Cairo',
      standard: 'ISO 9261 · CE Marked',
      benchmark: '$0.18 / m FOB',
    },
    {
      title: 'Farmland Lease with Aquifer Rights',
      query: 'Find verified agricultural land lease opportunities with operational deep wells and pivot infrastructure in Egypt or North Africa.',
      domain: 'Arm B · Farmland Acreage',
      corridor: 'Nubian Sandstone Aquifer Basin',
      standard: 'Audited Water Rights & Deed',
      benchmark: '1,200 Ha Available',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPrompt.trim()) {
      onLaunchMatchmaking(searchPrompt);
    }
  };

  return (
    <div className="space-y-10 py-2 font-sans text-[#14100c]">
      {/* Executive Command Masthead */}
      <section className="relative overflow-hidden rounded-3xl border border-[#d4af37]/35 bg-luxury-obsidian p-6 sm:p-10 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full gold-pill px-3.5 py-1 text-xs font-bold tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              AEIT Intelligence Terminal
            </span>
            <span className="text-[#a89f91] text-xs font-mono">
              Master System Standard v4.2 · Sourced Provenance Active
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fbf9f5] leading-[1.12]">
              Global Agricultural Trade, Events & Verified Business Intelligence
            </h1>
            <p className="text-sm sm:text-base text-[#d6cebf] max-w-3xl leading-relaxed font-normal">
              Empowering agricultural executives, importers, exporters, and cooperatives with traceable company dossiers, biosecurity compliance, official expo portals, and explainable AI trade matching.
            </p>
          </div>

          {/* Sourcing Search Console */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border border-[#d4af37]/40 bg-[#1e1712] p-2 shadow-2xl focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/20 transition-all">
              <div className="flex items-center pl-3 text-[#a89f91]">
                <Search className="h-4 w-4 text-[#e5c77e]" />
              </div>
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Query global ag intelligence: 'Suppliers of certified seed potatoes in NL/UK for 27 MT to Alexandria'..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-[#a89f91] outline-none font-medium"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] border border-[#d4af37]/40 px-6 py-3 text-xs font-bold text-white shadow-lg transition-all whitespace-nowrap cursor-pointer hover:scale-102"
              >
                <span>Run Sourcing Query</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Institutional Macro Benchmarks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3 text-[#d6cebf]">
            <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1e1712]/80 p-4 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a89f91]">
                Connected Trade Arms
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono tabular-nums">4 Domains</p>
              <span className="text-[11px] text-[#a89f91]">Inputs, Land, Trade, Expos</span>
            </div>
            <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1e1712]/80 p-4 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a89f91]">
                Biosecurity Corridors
              </span>
              <p className="text-xl font-black text-[#86efac] mt-1 font-mono tabular-nums">142 Corridors</p>
              <span className="text-[11px] text-[#a89f91]">Phytosanitary & Quota Feeds</span>
            </div>
            <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1e1712]/80 p-4 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a89f91]">
                Accredited Testing
              </span>
              <p className="text-xl font-black text-[#e5c77e] mt-1 font-mono tabular-nums">Tier-1 Registries</p>
              <span className="text-[11px] text-[#a89f91]">NAK, SASA, PPECB, DLG</span>
            </div>
            <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1e1712]/80 p-4 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a89f91]">
                Data Provenance Rule
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono tabular-nums">100% Traceable</p>
              <span className="text-[11px] text-[#86efac] font-medium">Zero Fabricated Listings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Sourcing Corridors & Benchmarks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-[#14100c] flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#0f5a28]" />
              <span>Verified Bilateral Sourcing Corridors</span>
            </h2>
            <p className="text-xs text-[#5c5246]">
              Benchmark commodity routes pre-evaluated against competent phytosanitary quarantine rules and shipping metrics.
            </p>
          </div>
          <button
            onClick={() => onNavigate('trade-desk')}
            className="text-xs font-bold text-[#0f5a28] hover:text-[#166534] flex items-center gap-1 cursor-pointer"
          >
            Open Trade Desk <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleCorridors.map((sc, idx) => (
            <div
              key={idx}
              onClick={() => onLaunchMatchmaking(sc.query)}
              className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#d4af37]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#78716c] font-semibold">{sc.domain}</span>
                  <span className="font-mono text-[#0f5a28] font-bold tabular-nums">{sc.benchmark}</span>
                </div>
                <h3 className="text-sm font-bold text-[#14100c] group-hover:text-[#0f5a28] transition-colors leading-snug">
                  {sc.title}
                </h3>
                <div className="space-y-1 text-xs text-[#5c5246]">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="h-3.5 w-3.5 text-[#a89f91] shrink-0" />
                    <span className="truncate">{sc.corridor}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#78716c] text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d97706] shrink-0" />
                    <span>{sc.standard}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between text-xs font-bold text-[#0f5a28] group-hover:text-[#166534]">
                <span>Evaluate Corridor</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Four Agricultural Trade Arms (Core Domain Architecture) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-[#14100c] flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#0f5a28]" />
              <span>The Four Agricultural Trade Arms</span>
            </h2>
            <p className="text-xs text-[#5c5246]">
              Structured trade architecture connecting equipment manufacturers, growers, farmland developers, and expos.
            </p>
          </div>
          <button
            onClick={() => onNavigate('businesses')}
            className="flex items-center gap-1 text-xs font-bold text-[#0f5a28] hover:text-[#166534] transition-colors cursor-pointer"
          >
            Explore Unified Directory <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Arm A */}
          <div
            onClick={() => onNavigate('businesses')}
            className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#0f5a28]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f7f2] border border-[#bbf7d0] text-[#0f5a28]">
                  <Tractor className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#14532d] bg-[#f0f7f2] border border-[#bbf7d0] px-2 py-0.5 rounded-md">
                  ARM A
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#14100c] group-hover:text-[#0f5a28] transition-colors">
                  Manufacturers & Agricultural Suppliers
                </h3>
                <p className="text-xs text-[#5c5246] mt-1.5 leading-relaxed">
                  Harvesters, precision drip irrigation, fertigation automation, seed breeders, and soil amendments.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#f0ece1] text-[11px] text-[#78716c] flex items-center gap-1.5 font-medium">
              <FileCheck className="h-3.5 w-3.5 text-[#0f5a28] shrink-0" />
              <span>NAK, SASA, DLG Testing Standards</span>
            </div>
          </div>

          {/* Arm B */}
          <div
            onClick={() => onNavigate('businesses')}
            className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#0d9488]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ccfbf1]/50 border border-[#99f6e4] text-[#0d9488]">
                  <Droplets className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#0f766e] bg-[#ccfbf1]/50 border border-[#99f6e4] px-2 py-0.5 rounded-md">
                  ARM B
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#14100c] group-hover:text-[#0d9488] transition-colors">
                  Producers & Farmland Opportunities
                </h3>
                <p className="text-xs text-[#5c5246] mt-1.5 leading-relaxed">
                  Commercial growers, agricultural cooperatives, outgrower networks, and titled land leases with aquifer rights.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#f0ece1] text-[11px] text-[#78716c] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0d9488] shrink-0" />
              <span>Audited Water Aquifers & Deeds</span>
            </div>
          </div>

          {/* Arm C */}
          <div
            onClick={() => onNavigate('trade-desk')}
            className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#2563eb]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbeafe]/60 border border-[#bfdbfe] text-[#2563eb]">
                  <Ship className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#1e40af] bg-[#dbeafe]/60 border border-[#bfdbfe] px-2 py-0.5 rounded-md">
                  ARM C
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#14100c] group-hover:text-[#2563eb] transition-colors">
                  Exporters, Importers & Trade Desk
                </h3>
                <p className="text-xs text-[#5c5246] mt-1.5 leading-relaxed">
                  Commodity desks, Incoterms 2020 calculations, customs tariffs, phytosanitary import permits (CAPQ, TRACES).
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#f0ece1] text-[11px] text-[#78716c] flex items-center gap-1.5 font-medium">
              <Scale className="h-3.5 w-3.5 text-[#2563eb] shrink-0" />
              <span>Phytosanitary & Quota Feeds</span>
            </div>
          </div>

          {/* Arm D */}
          <div
            onClick={() => onNavigate('events')}
            className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#d97706]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fef3c7]/60 border border-[#fde68a] text-[#d97706]">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#92400e] bg-[#fef3c7]/60 border border-[#fde68a] px-2 py-0.5 rounded-md">
                  ARM D
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#14100c] group-hover:text-[#d97706] transition-colors">
                  Expos, Seminars & Trade Missions
                </h3>
                <p className="text-xs text-[#5c5246] mt-1.5 leading-relaxed">
                  International agricultural expos, machinery trials, B2B trade delegations, and verified registration portals.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#f0ece1] text-[11px] text-[#78716c] flex items-center gap-1.5 font-medium">
              <Award className="h-3.5 w-3.5 text-[#d97706] shrink-0" />
              <span>Official Organizer Authenticity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Expos (Arm D Highlights) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-[#14100c] flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0f5a28]" />
              <span>Key International Agricultural Expos & Summits</span>
            </h2>
            <p className="text-xs text-[#5c5246]">
              Verified trade fairs with confirmed dates, official venues, and delegation registration.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-bold text-[#0f5a28] hover:text-[#166534] flex items-center gap-1 cursor-pointer"
          >
            View All Expos ({events.length}) <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.slice(0, 3).map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#0f5a28]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-md bg-[#f0f7f2] border border-[#bbf7d0] px-2 py-0.5 text-[10px] font-mono font-bold text-[#14532d]">
                    {evt.status}
                  </span>
                  <span className="text-[#78716c] font-medium text-[11px]">{evt.city}, {evt.country}</span>
                </div>

                <h3 className="font-bold text-[#14100c] text-sm group-hover:text-[#0f5a28] transition-colors line-clamp-1">
                  {evt.name}
                </h3>

                <p className="text-xs text-[#5c5246] line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="rounded-xl bg-[#fbf9f5] p-2.5 text-xs text-[#14100c] space-y-1 border border-[#e2d9cd]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="h-3.5 w-3.5 text-[#0f5a28] shrink-0" />
                    <span>{evt.startDate} — {evt.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#78716c] text-[11px] truncate">
                    <Landmark className="h-3.5 w-3.5 text-[#a89f91] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between text-xs">
                <span className="font-medium text-[#78716c] flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-[#d97706]" />
                  <span>Organizer: {evt.organizer.split(' ')[0]}</span>
                </span>
                <span className="text-[#0f5a28] font-bold flex items-center gap-1">
                  Inspect <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Agribusiness & Farmland Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-[#14100c] flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#0f5a28]" />
              <span>Verified Agribusiness & Farmland Opportunities</span>
            </h2>
            <p className="text-xs text-[#5c5246]">
              Commercial suppliers and land parcels with verified registry filings and lab inspection certificates.
            </p>
          </div>
          <button
            onClick={() => onNavigate('businesses')}
            className="text-xs font-bold text-[#0f5a28] hover:text-[#166534] flex items-center gap-1 cursor-pointer"
          >
            Explore Directory ({businesses.length}) <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businesses.slice(0, 3).map((biz) => (
            <div
              key={biz.id}
              onClick={() => onSelectBusiness(biz)}
              className="group cursor-pointer rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#0f5a28]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-md bg-[#fbf9f5] border border-[#e2d9cd] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#5c5246]">
                    {biz.country}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f5a28]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#0f5a28]" />
                    {biz.verifiedStatus.overallLevel}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[#14100c] text-sm group-hover:text-[#0f5a28] transition-colors line-clamp-1">
                    {biz.name}
                  </h3>
                  <p className="text-xs text-[#0f5a28] font-semibold mt-0.5">{biz.subCategory}</p>
                </div>

                <p className="text-xs text-[#5c5246] line-clamp-2 leading-relaxed">
                  {biz.overview}
                </p>

                <div className="space-y-1 pt-1 text-xs">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#a89f91] tracking-wider">
                    Certifications:
                  </span>
                  <div className="text-[#14100c] font-semibold text-xs">
                    {biz.certifications.slice(0, 2).map((c) => c.split('(')[0].trim()).join(' · ')}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#78716c] truncate max-w-[170px]">
                  {biz.sourceProvenance.sourceName.split('(')[0]}
                </span>
                <span className="text-[#0f5a28] font-sans font-bold">Inspect Dossier</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AEIT Trust & Provenance Constitution Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-[#f0f7f2] p-6 sm:p-8 luxury-card-shadow">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[#0f5a28] font-extrabold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>AEIT Trust Standard & Ground-Truth Ingestion</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#14100c]">
              Trust Is Multi-Dimensional: We Distinguish Verified Records from Unverified Claims
            </h3>
            <p className="text-xs sm:text-sm text-[#5c5246] leading-relaxed">
              We separate commercial registry filings from laboratory phytosanitary assays, contact verification, and historical customs entries. If pricing, shipment capacity, or quarantine approvals are unknown, AEIT explicitly states them as unknown.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('admin')}
              className="rounded-xl border border-[#c7bbb0] bg-white px-4 py-2.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] transition-colors cursor-pointer"
            >
              Inspect Governance Ledger
            </button>
            <button
              onClick={() => onNavigate('matchmaking')}
              className="rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-5 py-2.5 text-xs font-bold text-white transition-colors shadow-md cursor-pointer"
            >
              Launch AI Sourcing Engine
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
