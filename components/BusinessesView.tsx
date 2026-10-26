'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Search,
  Bookmark,
  Check,
  BadgeAlert,
  Award,
  Trees,
  LayoutGrid,
  Table as TableIcon,
  X,
} from 'lucide-react';
import { AgriBusiness } from '@/lib/types';

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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
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

    let matchesArm = true;
    if (selectedArm === 'ARM_A_SUPPLIERS') matchesArm = biz.arm === 'ARM_A_SUPPLIERS';
    else if (selectedArm === 'ARM_B_PRODUCERS') matchesArm = biz.arm === 'ARM_B_PRODUCERS';
    else if (selectedArm === 'ARM_B_LAND') matchesArm = !!biz.landDetails;
    else if (selectedArm === 'ARM_C_TRADE') matchesArm = biz.arm === 'ARM_C_TRADE';

    const matchesCountry = selectedCountry === 'ALL' || biz.country === selectedCountry;
    const matchesVerif =
      selectedVerification === 'ALL' || biz.verifiedStatus.overallLevel === selectedVerification;

    return matchesSearch && matchesArm && matchesCountry && matchesVerif;
  });

  return (
    <div className="space-y-6 py-2 font-sans text-[#14100c]">
      {/* Enterprise Directory Header */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 luxury-card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0f5a28]">
              <Building2 className="h-4 w-4" />
              <span>Verified Agribusiness & Farmland Directory · Arm A, B, C</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#14100c] tracking-tight mt-1">
              Agricultural Suppliers, Producers & Farmland Opportunities
            </h1>
            <p className="text-xs text-[#5c5246] max-w-3xl mt-1 leading-relaxed">
              Traceable agribusiness intelligence. Every supplier, breeder, grower, and land opportunity is linked to official company registries, accredited phytosanitary lab testing, or competent authorities.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-xl bg-[#fbf9f5] p-1 border border-[#e2d9cd] self-start sm:self-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#0f5a28] font-bold shadow-xs'
                  : 'text-[#78716c] hover:text-[#14100c]'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#0f5a28] font-bold shadow-xs'
                  : 'text-[#78716c] hover:text-[#14100c]'
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Dense Table</span>
            </button>
          </div>
        </div>

        {/* Trade Arm Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#f0ece1]">
          {[
            { id: 'ALL', label: 'All Entities' },
            { id: 'ARM_A_SUPPLIERS', label: 'Machinery & Seed Suppliers (Arm A)' },
            { id: 'ARM_B_PRODUCERS', label: 'Growers & Co-ops (Arm B)' },
            { id: 'ARM_B_LAND', label: 'Farmland Leases (Arm B)' },
            { id: 'ARM_C_TRADE', label: 'Commodity Exporters (Arm C)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedArm(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold tracking-normal transition-all cursor-pointer ${
                selectedArm === tab.id
                  ? 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0] shadow-xs'
                  : 'bg-[#fbf9f5] text-[#5c5246] hover:text-[#14100c] border border-[#e2d9cd]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product (e.g. Spunta seed, drip line), certs (NAK, SASA, GlobalGAP), or country..."
            className="w-full rounded-2xl border border-[#e2d9cd] bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#14100c] placeholder-[#a89f91] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-all luxury-card-shadow"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="rounded-2xl border border-[#e2d9cd] bg-white px-3.5 py-2.5 text-xs text-[#14100c] font-bold outline-none focus:border-[#d4af37] luxury-card-shadow cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Origins' : c}
              </option>
            ))}
          </select>

          {/* Verification Status Filter */}
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="rounded-2xl border border-[#e2d9cd] bg-white px-3.5 py-2.5 text-xs text-[#14100c] font-bold outline-none focus:border-[#d4af37] luxury-card-shadow cursor-pointer"
          >
            <option value="ALL">All Verification Tiers</option>
            <option value="Fully Verified">Fully Verified (Tier-1)</option>
            <option value="Conditionally Verified">Conditionally Verified</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Directory Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((biz) => {
            const saved = isBusinessSaved(biz.id);
            const isLand = !!biz.landDetails;

            return (
              <div
                key={biz.id}
                className="rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#d4af37]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#5c5246] bg-[#fbf9f5] border border-[#e2d9cd] px-2 py-0.5 rounded-md">
                      {biz.arm.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#0f5a28]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#0f5a28]" />
                      <span>{biz.verifiedStatus.overallLevel}</span>
                    </div>
                  </div>

                  {/* Company Name & Sector */}
                  <div>
                    <h3
                      onClick={() => setInspectingBiz(biz)}
                      className="cursor-pointer text-sm font-bold text-[#14100c] hover:text-[#0f5a28] transition-colors line-clamp-1"
                    >
                      {biz.name}
                    </h3>
                    <p className="text-xs text-[#0f5a28] font-bold mt-0.5">
                      {biz.subCategory}
                    </p>
                    <p className="text-xs text-[#78716c] flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="h-3 w-3 text-[#78716c]" />
                      <span>{biz.city}, {biz.country}</span>
                    </p>
                  </div>

                  {/* Multi-Dimensional Verification Matrix */}
                  <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#fbf9f5] p-2.5 border border-[#e2d9cd] text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      {biz.verifiedStatus.businessRegistration ? (
                        <CheckCircle2 className="h-3 w-3 text-[#0f5a28] shrink-0" />
                      ) : (
                        <BadgeAlert className="h-3 w-3 text-[#a89f91] shrink-0" />
                      )}
                      <span className="text-[#14100c] font-medium">Commercial Reg</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {biz.verifiedStatus.certification ? (
                        <CheckCircle2 className="h-3 w-3 text-[#0f5a28] shrink-0" />
                      ) : (
                        <BadgeAlert className="h-3 w-3 text-[#a89f91] shrink-0" />
                      )}
                      <span className="text-[#14100c] font-medium">Lab Standards</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {biz.verifiedStatus.contactVerified ? (
                        <CheckCircle2 className="h-3 w-3 text-[#0f5a28] shrink-0" />
                      ) : (
                        <BadgeAlert className="h-3 w-3 text-[#a89f91] shrink-0" />
                      )}
                      <span className="text-[#14100c] font-medium">Official Channel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {biz.verifiedStatus.tradeHistory ? (
                        <CheckCircle2 className="h-3 w-3 text-[#0f5a28] shrink-0" />
                      ) : (
                        <BadgeAlert className="h-3 w-3 text-[#a89f91] shrink-0" />
                      )}
                      <span className="text-[#14100c] font-medium">Export History</span>
                    </div>
                  </div>

                  {/* Farmland Lease specifics */}
                  {isLand && biz.landDetails && (
                    <div className="rounded-xl border border-[#fde68a] bg-[#fef3c7]/40 p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#92400e]">
                        <span className="flex items-center gap-1">
                          <Trees className="h-3.5 w-3.5" />
                          <span>Farmland: {biz.landDetails.totalAreaHa} Ha</span>
                        </span>
                        <span className="font-mono text-[11px] text-[#b45309]">
                          {biz.landDetails.leaseTermYears} Yrs Term
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78350f]">
                        <strong className="text-[#92400e]">Aquifer:</strong> {biz.landDetails.waterAccess}
                      </p>
                    </div>
                  )}

                  {/* Key Products & Capabilities */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a89f91]">
                      Capabilities & Products:
                    </span>
                    <p className="text-[#5c5246] text-xs leading-relaxed line-clamp-2">
                      {biz.products.slice(0, 3).join(' · ')}
                    </p>
                  </div>

                  {/* Sourced Provenance Tag */}
                  <div className="text-[10px] text-[#78716c] font-mono truncate">
                    <span>Registry: </span>
                    <span className="text-[#14100c] font-bold">{biz.sourceProvenance.sourceName.split('(')[0]}</span>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSaveBusiness(biz)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      saved
                        ? 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0]'
                        : 'border border-[#c7bbb0] bg-white text-[#5c5246] hover:text-[#14100c] hover:bg-[#fbf9f5]'
                    }`}
                  >
                    {saved ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#0f5a28]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5" />
                        <span>Save Lead</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInspectingBiz(biz)}
                      className="rounded-xl border border-[#c7bbb0] bg-white px-3 py-1.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] cursor-pointer"
                    >
                      Diligence
                    </button>
                    <button
                      onClick={() => onInitiateMatchmakingWithBiz(biz)}
                      className="rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-3.5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
                    >
                      AI Match
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Directory Dense Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-3xl border border-[#e2d9cd] bg-white luxury-card-shadow">
          <table className="w-full text-left text-xs font-sans">
            <thead className="border-b border-[#e2d9cd] bg-[#fbf9f5] text-[#5c5246] uppercase font-mono text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Entity & Sector</th>
                <th className="py-3.5 px-3">Origin</th>
                <th className="py-3.5 px-3">Verification Tier</th>
                <th className="py-3.5 px-3">Annual Capacity / Land</th>
                <th className="py-3.5 px-3">Incoterms / Ports</th>
                <th className="py-3.5 px-3">Key Certifications</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece1] text-[#14100c]">
              {filtered.map((biz) => {
                const saved = isBusinessSaved(biz.id);
                return (
                  <tr key={biz.id} className="hover:bg-[#fcfbf9] transition-colors">
                    <td className="py-3 px-4">
                      <div
                        onClick={() => setInspectingBiz(biz)}
                        className="cursor-pointer font-bold text-[#14100c] hover:text-[#0f5a28]"
                      >
                        {biz.name}
                      </div>
                      <div className="text-[11px] text-[#0f5a28] font-bold">{biz.subCategory}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[#5c5246]">
                      {biz.city}, {biz.country}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#0f5a28]">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {biz.verifiedStatus.overallLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#14100c] font-bold">
                      {biz.landDetails ? `${biz.landDetails.totalAreaHa} Ha Farmland` : biz.annualCapacity}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#5c5246]">
                      {biz.incoterms.slice(0, 2).join(', ')}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-[#5c5246] font-medium">
                      {biz.certifications.slice(0, 2).map((c) => c.split('(')[0]).join(' · ')}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => setInspectingBiz(biz)}
                        className="rounded-xl border border-[#c7bbb0] bg-white px-2.5 py-1 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] cursor-pointer"
                      >
                        Dossier
                      </button>
                      <button
                        onClick={() => onSaveBusiness(biz)}
                        className={`rounded-xl px-2.5 py-1 text-xs font-bold cursor-pointer ${
                          saved
                            ? 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0]'
                            : 'border border-[#c7bbb0] bg-white text-[#5c5246] hover:bg-[#fbf9f5]'
                        }`}
                      >
                        {saved ? 'Saved' : 'Save'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Complete Diligence Dossier Modal */}
      {inspectingBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#120f0c]/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#f0ece1] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#5c5246] bg-[#fbf9f5] border border-[#e2d9cd] px-2 py-0.5 rounded-md">
                  {inspectingBiz.arm}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#14100c] mt-2">{inspectingBiz.name}</h2>
                <p className="text-xs text-[#0f5a28] font-bold">{inspectingBiz.subCategory}</p>
                <p className="text-xs text-[#78716c] font-mono mt-0.5">
                  {inspectingBiz.city}, {inspectingBiz.country} · Official Website: {inspectingBiz.website}
                </p>
              </div>
              <button
                onClick={() => setInspectingBiz(null)}
                className="rounded-xl p-1.5 text-[#78716c] hover:bg-[#fbf9f5] hover:text-[#14100c] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a89f91]">
                Operational Overview & Corporate Profile
              </h4>
              <p className="text-xs sm:text-sm text-[#14100c] leading-relaxed">
                {inspectingBiz.overview}
              </p>
            </div>

            {/* Commercial Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl bg-[#fbf9f5] p-4 border border-[#e2d9cd] text-xs font-mono">
              <div>
                <span className="text-[#78716c]">Annual Production Capacity:</span>
                <p className="font-bold text-[#14100c] mt-0.5">{inspectingBiz.annualCapacity}</p>
              </div>
              <div>
                <span className="text-[#78716c]">Minimum Order Quantity (MOQ):</span>
                <p className="font-bold text-[#14100c] mt-0.5">{inspectingBiz.minOrderQty}</p>
              </div>
              <div>
                <span className="text-[#78716c]">Supported Incoterms 2020:</span>
                <p className="font-bold text-[#14100c] mt-0.5">{inspectingBiz.incoterms.join(', ')}</p>
              </div>
              <div>
                <span className="text-[#78716c]">Primary Export Corridors:</span>
                <p className="font-bold text-[#14100c] mt-0.5">{inspectingBiz.exportDestinations.join(', ')}</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a89f91]">
                Official Standards & Phytosanitary Accreditations
              </h4>
              <div className="flex flex-wrap gap-2">
                {inspectingBiz.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-xl bg-[#f0f7f2] px-3 py-1 text-xs text-[#14532d] border border-[#bbf7d0] font-mono font-bold"
                  >
                    <Award className="h-3.5 w-3.5" />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Farmland Lease Specs if applicable */}
            {inspectingBiz.landDetails && (
              <div className="space-y-3 rounded-2xl border border-[#fde68a] bg-[#fef3c7]/40 p-4 text-xs font-mono">
                <h4 className="font-bold text-[#92400e] flex items-center gap-1.5 text-sm">
                  <Trees className="h-4 w-4" />
                  <span>Farmland Lease Specifications & Hydrological Due Diligence</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[#78350f]">
                  <div>
                    <span className="text-[#92400e]">Acreage:</span> {inspectingBiz.landDetails.totalAreaHa} Ha
                  </div>
                  <div>
                    <span className="text-[#92400e]">Lease Period:</span> {inspectingBiz.landDetails.leaseTermYears} Years
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#92400e]">Water Aquifer:</span> {inspectingBiz.landDetails.waterAccess}
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#92400e]">Soil Condition:</span> {inspectingBiz.landDetails.soilType}
                  </div>
                </div>
                <p className="text-[11px] text-[#78350f] italic pt-2 border-t border-[#fde68a] font-sans">
                  {inspectingBiz.landDetails.dueDiligenceStatus}
                </p>
              </div>
            )}

            {/* Source Provenance Section */}
            <div className="rounded-2xl border border-[#e2d9cd] bg-[#f0f7f2] p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold uppercase tracking-wider text-[#0f5a28] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Traceable Provenance Audit
                </span>
                <span className="rounded-md bg-white border border-[#bbf7d0] px-2 py-0.5 text-[10px] font-mono font-bold text-[#14532d]">
                  {inspectingBiz.sourceProvenance.evidenceType}
                </span>
              </div>
              <p className="text-[#14100c]">
                <strong className="text-[#5c5246]">Primary Authority:</strong> {inspectingBiz.sourceProvenance.sourceName}
              </p>
              <p className="text-[#5c5246] font-mono text-[11px]">
                <strong>Timestamp:</strong> {inspectingBiz.sourceProvenance.retrievalDate}
              </p>
              {inspectingBiz.sourceProvenance.notes && (
                <p className="text-[#5c5246] italic text-[11px]">
                  <strong>Auditor Notes:</strong> {inspectingBiz.sourceProvenance.notes}
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f0ece1]">
              <button
                onClick={() => {
                  onSaveBusiness(inspectingBiz);
                  setInspectingBiz(null);
                }}
                className="rounded-xl border border-[#c7bbb0] bg-white px-4 py-2.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] cursor-pointer"
              >
                {isBusinessSaved(inspectingBiz.id) ? 'Saved in Pipeline' : 'Save to Pipeline'}
              </button>
              <button
                onClick={() => {
                  onInitiateMatchmakingWithBiz(inspectingBiz);
                  setInspectingBiz(null);
                }}
                className="rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
              >
                Execute Sourcing Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
