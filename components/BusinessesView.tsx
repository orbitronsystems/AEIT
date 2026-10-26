'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Bookmark,
  Check,
  Globe,
  Mail,
  Phone,
  FileText,
  BadgeAlert,
  Layers,
  Award,
  Trees,
  Truck,
  Droplets,
  Tractor,
} from 'lucide-react';
import { AgriBusiness, TradeArm } from '@/lib/types';

interface BusinessesViewProps {
  businesses: AgriBusiness[];
  onSaveBusiness: (biz: AgriBusiness) => void;
  isBusinessSaved: (id: string) => boolean;
  onInitiateMatchmakingWithBiz: (biz: AgriBusiness) => void;
}

export default function BusinessesView({
  businesses,
  onSaveBusiness,
  isBusinessSaved,
  onInitiateMatchmakingWithBiz,
}: BusinessesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArm, setSelectedArm] = useState<string>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [inspectingBiz, setInspectingBiz] = useState<AgriBusiness | null>(null);

  const countries = ['ALL', ...Array.from(new Set(businesses.map((b) => b.country)))];

  const filtered = businesses.filter((biz) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      biz.name.toLowerCase().includes(term) ||
      biz.subCategory.toLowerCase().includes(term) ||
      biz.country.toLowerCase().includes(term) ||
      biz.products.some((p) => p.toLowerCase().includes(term)) ||
      biz.certifications.some((c) => c.toLowerCase().includes(term));

    const matchesArm = selectedArm === 'ALL' || biz.arm === selectedArm;
    const matchesCountry = selectedCountry === 'ALL' || biz.country === selectedCountry;
    const matchesVerif =
      selectedVerification === 'ALL' || biz.verifiedStatus.overallLevel === selectedVerification;

    return matchesSearch && matchesArm && matchesCountry && matchesVerif;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Banner */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Building2 className="h-4 w-4" />
          <span>ARM A & B — Agricultural Suppliers, Producers & Land Holdings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Verified Agribusiness Directory
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ground-truth company intelligence. Every supplier, breeder, grower, and land opportunity is linked to official company registries, accredited phytosanitary lab testing, or competent authorities. No unverified claims or phantom listings.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers by product (e.g. Spunta, drip irrigation), certification (NAK, SASA, GlobalGAP), or name..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Arm Filter */}
          <select
            value={selectedArm}
            onChange={(e) => setSelectedArm(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Trade Arms</option>
            <option value="ARM_A_SUPPLIERS">ARM A: Machinery & Inputs</option>
            <option value="ARM_B_PRODUCERS">ARM B: Producers & Farmland</option>
            <option value="ARM_C_TRADE">ARM C: B2B Trade & Exporters</option>
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Countries' : c}
              </option>
            ))}
          </select>

          {/* Verification Status Filter */}
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Verification Levels</option>
            <option value="Fully Verified">Fully Verified</option>
            <option value="Conditionally Verified">Conditionally Verified</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((biz) => {
          const saved = isBusinessSaved(biz.id);
          const isLand = !!biz.landDetails;

          return (
            <div
              key={biz.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-emerald-500/5"
            >
              <div className="space-y-3">
                {/* Badges Header */}
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    {biz.arm.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{biz.verifiedStatus.overallLevel}</span>
                  </div>
                </div>

                {/* Company Name & Role */}
                <div>
                  <h3
                    onClick={() => setInspectingBiz(biz)}
                    className="cursor-pointer text-base font-bold text-white hover:text-emerald-300 transition-colors line-clamp-1"
                  >
                    {biz.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">
                    {biz.subCategory}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    <span>{biz.city}, {biz.country}</span>
                  </p>
                </div>

                {/* Multi-Dimensional Verification Matrix */}
                <div className="grid grid-cols-2 gap-1.5 rounded-lg bg-slate-950/60 p-2 border border-slate-800/80 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    {biz.verifiedStatus.businessRegistration ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <BadgeAlert className="h-3 w-3 text-slate-500" />
                    )}
                    <span className="text-slate-300">Commercial Registry</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {biz.verifiedStatus.certification ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <BadgeAlert className="h-3 w-3 text-slate-500" />
                    )}
                    <span className="text-slate-300">Standards / Lab Cert</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {biz.verifiedStatus.contactVerified ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <BadgeAlert className="h-3 w-3 text-slate-500" />
                    )}
                    <span className="text-slate-300">Official Channel</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {biz.verifiedStatus.tradeHistory ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <BadgeAlert className="h-3 w-3 text-slate-500" />
                    )}
                    <span className="text-slate-300">Cross-Border History</span>
                  </div>
                </div>

                {/* Land Opportunity Details if ARM B land lease */}
                {isLand && biz.landDetails && (
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-xs text-amber-200/90 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <Trees className="h-3.5 w-3.5" />
                      <span>Agricultural Land Lease ({biz.landDetails.totalAreaHa} Hectares)</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      {biz.landDetails.waterAccess}
                    </p>
                  </div>
                )}

                {/* Products & Capabilities */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Products & Capabilities:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {biz.products.slice(0, 3).map((prod, i) => (
                      <span
                        key={i}
                        className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-200"
                      >
                        {prod}
                      </span>
                    ))}
                    {biz.products.length > 3 && (
                      <span className="text-[10px] text-slate-400">
                        +{biz.products.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Provenance Footer Badge */}
                <div className="rounded bg-slate-950/40 p-2 text-[10px] text-slate-400 border border-slate-800/40">
                  <span className="text-slate-400">Source: </span>
                  <span className="text-slate-300 font-mono">
                    {biz.sourceProvenance.sourceName.slice(0, 38)}...
                  </span>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSaveBusiness(biz)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    saved
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {saved ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>Save Lead</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setInspectingBiz(biz)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    Diligence
                  </button>
                  <button
                    onClick={() => onInitiateMatchmakingWithBiz(biz)}
                    className="rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    AI Match
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <Building2 className="mx-auto h-8 w-8 text-slate-600" />
          <h3 className="text-base font-semibold text-white">No businesses match your search</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or clearing the trade arm filters.
          </p>
        </div>
      )}

      {/* Complete Diligence & Provenance Modal */}
      {inspectingBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-300">
                  {inspectingBiz.arm}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{inspectingBiz.name}</h2>
                <p className="text-xs text-emerald-400">{inspectingBiz.subCategory}</p>
              </div>
              <button
                onClick={() => setInspectingBiz(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Company & Capability Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {inspectingBiz.overview}
              </p>
            </div>

            {/* Operational Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-slate-950/60 p-4 border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400">Annual Production Capacity:</span>
                <p className="font-semibold text-white">{inspectingBiz.annualCapacity}</p>
              </div>
              <div>
                <span className="text-slate-400">Minimum Order Quantity (MOQ):</span>
                <p className="font-semibold text-white">{inspectingBiz.minOrderQty}</p>
              </div>
              <div>
                <span className="text-slate-400">Supported Incoterms:</span>
                <p className="font-semibold text-white">{inspectingBiz.incoterms.join(', ')}</p>
              </div>
              <div>
                <span className="text-slate-400">Key Export Corridors:</span>
                <p className="font-semibold text-white">{inspectingBiz.exportDestinations.join(', ')}</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Certifications & Seed Standards
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {inspectingBiz.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 border border-emerald-500/20"
                  >
                    <Award className="h-3 w-3" />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Land Due Diligence if applicable */}
            {inspectingBiz.landDetails && (
              <div className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs space-y-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Trees className="h-4 w-4" />
                  <span>Farmland Lease Specifications & Due Diligence Status</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400">Area:</span> {inspectingBiz.landDetails.totalAreaHa} Ha
                  </div>
                  <div>
                    <span className="text-slate-400">Lease Term:</span> {inspectingBiz.landDetails.leaseTermYears} Years
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400">Water:</span> {inspectingBiz.landDetails.waterAccess}
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400">Soil:</span> {inspectingBiz.landDetails.soilType}
                  </div>
                </div>
                <p className="text-[11px] text-amber-300/80 italic pt-1 border-t border-amber-500/20">
                  {inspectingBiz.landDetails.dueDiligenceStatus}
                </p>
              </div>
            )}

            {/* Source Provenance Section (Phase 0 & 4.1 Requirement) */}
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Data Provenance & Source Evidence
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/20">
                  {inspectingBiz.sourceProvenance.evidenceType}
                </span>
              </div>
              <p className="text-slate-300">
                <strong>Primary Source:</strong> {inspectingBiz.sourceProvenance.sourceName}
              </p>
              <p className="text-slate-400">
                <strong>Verification Date:</strong> {inspectingBiz.sourceProvenance.retrievalDate}
              </p>
              {inspectingBiz.sourceProvenance.notes && (
                <p className="text-slate-400 italic">
                  <strong>Auditor Notes:</strong> {inspectingBiz.sourceProvenance.notes}
                </p>
              )}
              <a
                href={inspectingBiz.sourceProvenance.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:underline pt-1"
              >
                <span>Inspect Source Registry Link</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  onSaveBusiness(inspectingBiz);
                  setInspectingBiz(null);
                }}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700"
              >
                {isBusinessSaved(inspectingBiz.id) ? 'Saved in Workspace' : 'Save Business Lead'}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${inspectingBiz.contactEmail}`}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact Email</span>
                </a>
                <button
                  onClick={() => {
                    onInitiateMatchmakingWithBiz(inspectingBiz);
                    setInspectingBiz(null);
                  }}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Run Matchmaking With Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
