'use client';

import React from 'react';
import {
  Globe,
  Compass,
  Calendar,
  Building2,
  Cpu,
  Ship,
  Briefcase,
  ShieldCheck,
  Search,
  PlusCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export type NavTab =
  | 'discover'
  | 'events'
  | 'businesses'
  | 'matchmaking'
  | 'trade-desk'
  | 'workspace'
  | 'admin';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  userRole: string;
  onRoleChange: (role: string) => void;
  savedCount: number;
  onOpenRfqModal: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  userRole,
  onRoleChange,
  savedCount,
  onOpenRfqModal,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      {/* Top Utility Bar */}
      <div className="border-b border-slate-800/60 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              AEIT Global AgTrade Network Active
            </span>
            <span className="hidden text-slate-600 sm:inline">•</span>
            <span className="hidden sm:inline">140+ Jurisdictions</span>
            <span className="hidden text-slate-600 md:inline">•</span>
            <span className="hidden text-slate-300 md:inline">
              Evidence Standard: <strong className="text-emerald-300">Verified Provenance</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Active Role:</span>
              <select
                value={userRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-200 outline-none hover:border-slate-600 focus:border-emerald-500"
              >
                <option value="Global Buyer / Importer">Global Buyer / Importer</option>
                <option value="Agri-Exporter & Trader">Agri-Exporter & Trader</option>
                <option value="Machinery & Input Supplier">Machinery & Input Supplier</option>
                <option value="Trust Auditor & Admin">Trust Auditor & Admin</option>
              </select>
            </div>
            <div className="hidden items-center gap-1 text-slate-400 lg:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Multi-Dimensional Verification Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <div
          onClick={() => onTabChange('discover')}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Globe className="h-6 w-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">AEIT</span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                INTELLIGENCE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Agricultural Trade, Events & Matchmaking SaaS
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => onTabChange('discover')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'discover'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Discover
          </button>

          <button
            onClick={() => onTabChange('events')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'events'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Events (Arm D)
          </button>

          <button
            onClick={() => onTabChange('businesses')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'businesses'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            Businesses & Land
          </button>

          <button
            onClick={() => onTabChange('matchmaking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'matchmaking'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ring-1 ring-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            AI Matchmaking
            <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-bold text-emerald-300">
              AI
            </span>
          </button>

          <button
            onClick={() => onTabChange('trade-desk')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'trade-desk'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Ship className="h-3.5 w-3.5" />
            Trade Desk (Arm C)
          </button>

          <button
            onClick={() => onTabChange('workspace')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'workspace'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            Workspace
            {savedCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-slate-950">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'admin'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            Trust Center
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRfqModal}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Post Sourcing</span> RFQ
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-800 px-2 py-2 gap-1 scrollbar-none">
        {(
          [
            ['discover', 'Discover', Compass],
            ['matchmaking', 'AI Sourcing', Cpu],
            ['businesses', 'Businesses', Building2],
            ['events', 'Events', Calendar],
            ['trade-desk', 'Trade Desk', Ship],
            ['workspace', `Workspace (${savedCount})`, Briefcase],
            ['admin', 'Admin', ShieldCheck],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => onTabChange(key as NavTab)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${
              currentTab === key
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
