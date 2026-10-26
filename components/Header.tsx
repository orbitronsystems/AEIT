'use client';

import React from 'react';
import {
  Compass,
  Calendar,
  Building2,
  Cpu,
  Ship,
  Briefcase,
  ShieldCheck,
  PlusCircle,
  Award,
  Sprout,
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
    <header className="sticky top-0 z-50 border-b border-[#3d3023]/80 bg-[#120f0c] text-[#fbf9f5] shadow-lg font-sans">
      {/* Executive Global Agricultural Trade Terminal Ticker */}
      <div className="border-b border-[#2d2218] bg-[#0b0907] px-4 py-1.5 text-[11px] text-[#e0d8cc]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none whitespace-nowrap font-mono text-[11px]">
            <span className="flex items-center gap-1.5 font-sans font-bold tracking-wider text-[#86efac] uppercase text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse"></span>
              AEIT AgTrade Live Feed
            </span>
            <span className="text-[#3d3023]">|</span>
            <span className="flex items-center gap-1">
              <span className="text-[#c7bbb0] font-sans font-medium">Seed Potatoes (NL → Egypt):</span>
              <strong className="text-white font-bold tabular-nums">€640/MT CIF</strong>
              <span className="text-[#86efac] font-semibold tabular-nums">+2.4%</span>
            </span>
            <span className="text-[#3d3023]">|</span>
            <span className="flex items-center gap-1">
              <span className="text-[#c7bbb0] font-sans font-medium">US Milling Wheat (Gulf → Tokyo):</span>
              <strong className="text-white font-bold tabular-nums">$234/MT FOB</strong>
              <span className="text-[#86efac] font-semibold tabular-nums">-0.8%</span>
            </span>
            <span className="text-[#3d3023]">|</span>
            <span className="flex items-center gap-1">
              <span className="text-[#c7bbb0] font-sans font-medium">Hass Avocados (Mombasa → Rotterdam):</span>
              <strong className="text-white font-bold tabular-nums">$4,250/Reefer</strong>
            </span>
            <span className="text-[#3d3023]">|</span>
            <span className="flex items-center gap-1 text-[#e5c77e] font-sans font-medium">
              <Award className="h-3 w-3 text-[#d4af37] shrink-0" />
              <span>World Ag Expo & Agritechnica 2027 Delegations Active</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[#c7bbb0] shrink-0 font-sans">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#a89b88] text-[11px] font-medium">Desk Role:</span>
              <select
                value={userRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="rounded-lg border border-[#4a3a2a] bg-[#1e1712] px-2.5 py-0.5 text-xs font-semibold text-[#f0e8dd] outline-none hover:border-[#d4af37]/50 focus:border-[#d4af37] transition-colors cursor-pointer"
              >
                <option value="Global Buyer / Importer">Global Importer / Sourcing Executive</option>
                <option value="Agri-Exporter & Trader">Agri-Exporter & Commodity Trader</option>
                <option value="Machinery & Input Supplier">Machinery & Seed Supplier</option>
                <option value="Farmland Investor & Developer">Farmland Investor & Developer</option>
                <option value="Trust Auditor & Admin">Compliance Auditor & Admin</option>
              </select>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[#1e1712] px-3 py-0.5 border border-[#d4af37]/30 text-[11px] text-[#e5c77e]">
              <ShieldCheck className="h-3 w-3 text-[#d4af37]" />
              <span className="font-semibold text-[#f3e6c4]">NAK · SASA · USDA · CAPQ Accredited</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Wood & Gold Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand Identity */}
        <div
          onClick={() => onTabChange('discover')}
          className="flex cursor-pointer items-center gap-3.5 group select-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#15803d] to-[#0f5a28] border border-[#d4af37]/40 text-white shadow-md group-hover:scale-105 transition-all">
            <Sprout className="h-5 w-5 text-[#f3e6c4]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight gold-gradient-text font-sans">AEIT</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#e5c77e] bg-[#221a12] border border-[#d4af37]/40 px-2 py-0.5 rounded-full">
                Agri-Trade Terminal
              </span>
            </div>
            <p className="text-[11px] text-[#b8ab99] font-medium tracking-wide hidden sm:block">
              Global Agricultural Intelligence, Events & Business Connectivity
            </p>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 font-sans">
          {[
            { id: 'discover', label: 'Discover', icon: Compass, badge: null },
            { id: 'businesses', label: 'Suppliers & Land', icon: Building2, badge: 'Arm A/B' },
            { id: 'events', label: 'Expos & Summits', icon: Calendar, badge: 'Arm D' },
            { id: 'trade-desk', label: 'Trade Desk & Customs', icon: Ship, badge: 'Arm C' },
            { id: 'matchmaking', label: 'AI Sourcing Engine', icon: Cpu, badge: 'AI' },
            {
              id: 'workspace',
              label: 'Workspace',
              icon: Briefcase,
              badge: savedCount > 0 ? `${savedCount}` : null,
            },
            { id: 'admin', label: 'Governance', icon: ShieldCheck, badge: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as NavTab)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#fbf9f5] text-[#14100c] shadow-md border border-[#d4af37]/30'
                    : 'text-[#d6cebf] hover:text-white hover:bg-[#221a12]'
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${
                    isActive ? 'text-[#0f5a28]' : 'text-[#a89f91]'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 text-[9px] font-mono rounded-md font-bold ${
                      isActive
                        ? 'bg-[#f0f7f2] text-[#14532d] border border-[#bbf7d0]'
                        : 'bg-[#281f16] text-[#e5c77e] border border-[#d4af37]/20'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Sourcing RFQ */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRfqModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] border border-[#d4af37]/40 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#f3e6c4]" />
            <span>Create Sourcing RFQ</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-[#3d3023] bg-[#14100c] px-3 py-2 gap-1.5 scrollbar-none font-sans">
        {(
          [
            ['discover', 'Discover', Compass],
            ['businesses', 'Suppliers & Land', Building2],
            ['events', 'Expos', Calendar],
            ['trade-desk', 'Trade Desk', Ship],
            ['matchmaking', 'AI Sourcing', Cpu],
            ['workspace', `Workspace ${savedCount > 0 ? `(${savedCount})` : ''}`, Briefcase],
            ['admin', 'Governance', ShieldCheck],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => onTabChange(key as NavTab)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
              currentTab === key
                ? 'bg-[#fbf9f5] text-[#14100c]'
                : 'text-[#d6cebf] hover:bg-[#221a12] hover:text-white'
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
