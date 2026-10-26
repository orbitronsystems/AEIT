'use client';

import React, { useState, useEffect } from 'react';
import Header, { NavTab } from '@/components/Header';
import DiscoverView from '@/components/DiscoverView';
import EventsView from '@/components/EventsView';
import BusinessesView from '@/components/BusinessesView';
import MatchmakingView from '@/components/MatchmakingView';
import TradeDeskView from '@/components/TradeDeskView';
import WorkspaceView from '@/components/WorkspaceView';
import AdminView from '@/components/AdminView';
import RfqModal from '@/components/RfqModal';

import { SEED_BUSINESSES } from '@/lib/data/businesses';
import { SEED_EVENTS } from '@/lib/data/events';
import { AgriBusiness, AgriEvent, WorkspaceLead, MatchCandidate, TradeReadinessResult } from '@/lib/types';

const INITIAL_WORKSPACE_LEADS: WorkspaceLead[] = [
  {
    id: 'lead-hzpc-demo',
    title: 'HZPC Holland B.V. — Certified Seed Potatoes',
    category: 'business',
    country: 'Netherlands',
    stage: 'Qualified',
    notes: 'NAK Class A inspection certificates verified. Spunta variety ready for Alexandria port shipment.',
    savedAt: '2026-10-24T10:00:00Z',
    details: {
      businessId: 'biz-hzpc-nl',
      matchScore: 96,
      matchRationale: 'Direct breeder and NAK-certified exporter with regular reefer shipments to Alexandria.',
    },
  },
  {
    id: 'lead-agritechnica-demo',
    title: 'AGRITECHNICA 2027 — Hannover Exhibition',
    category: 'event',
    country: 'Germany',
    stage: 'Identified',
    notes: 'Scheduling meetings with Grimme and Netafim European delegations.',
    savedAt: '2026-10-22T14:30:00Z',
    details: {
      eventId: 'evt-agritechnica-2027',
      venue: 'Hannover Exhibition Grounds',
    },
  },
  {
    id: 'lead-rfq-potato-demo',
    title: 'RFQ: 27 MT Certified Seed Potatoes (Spunta / Arizona)',
    category: 'sourcing_rfq',
    country: 'Egypt',
    stage: 'Contacted',
    notes: 'Target delivery November 2026 planting season. Requires CAPQ import license clearance.',
    savedAt: '2026-10-25T08:15:00Z',
    details: {
      commodity: 'Certified Seed Potatoes',
      quantity: 27,
      unit: 'Metric Tonnes',
      destination: 'Port of Alexandria, Egypt',
    },
  },
];

export default function Home() {
  const [currentTab, setCurrentTab] = useState<NavTab>('discover');
  const [userRole, setUserRole] = useState('Global Buyer / Importer');
  const [workspaceLeads, setWorkspaceLeads] = useState<WorkspaceLead[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aeit_workspace_leads');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Failed to parse stored leads:', e);
      }
    }
    return INITIAL_WORKSPACE_LEADS;
  });

  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [matchmakingPrompt, setMatchmakingPrompt] = useState<string>(
    'Find potential suppliers of seed potatoes in the Netherlands or Scotland that could supply 27 metric tonnes to Egypt.'
  );
  const [tradeDeskParams, setTradeDeskParams] = useState({
    commodity: 'Seed Potatoes (Solanum tuberosum)',
    origin: 'Netherlands',
    destination: 'Egypt',
  });

  const saveWorkspaceLeads = (newLeads: WorkspaceLead[]) => {
    setWorkspaceLeads(newLeads);
    try {
      localStorage.setItem('aeit_workspace_leads', JSON.stringify(newLeads));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

  // Business save handler
  const handleSaveBusiness = (biz: AgriBusiness) => {
    const existing = workspaceLeads.find((l) => l.id === `biz-${biz.id}`);
    if (existing) {
      // Toggle remove
      saveWorkspaceLeads(workspaceLeads.filter((l) => l.id !== `biz-${biz.id}`));
      return;
    }

    const newLead: WorkspaceLead = {
      id: `biz-${biz.id}`,
      title: biz.name,
      category: 'business',
      country: biz.country,
      stage: 'Identified',
      notes: `Verified: ${biz.verifiedStatus.overallLevel}. Products: ${biz.products.join(', ')}`,
      savedAt: new Date().toISOString(),
      details: {
        businessId: biz.id,
        subCategory: biz.subCategory,
        capacity: biz.annualCapacity,
      },
    };
    saveWorkspaceLeads([newLead, ...workspaceLeads]);
  };

  // Event save handler
  const handleSaveEvent = (evt: AgriEvent) => {
    const existing = workspaceLeads.find((l) => l.id === `evt-${evt.id}`);
    if (existing) {
      saveWorkspaceLeads(workspaceLeads.filter((l) => l.id !== `evt-${evt.id}`));
      return;
    }

    const newLead: WorkspaceLead = {
      id: `evt-${evt.id}`,
      title: evt.name,
      category: 'event',
      country: evt.country,
      stage: 'Identified',
      notes: `Dates: ${evt.startDate} to ${evt.endDate} in ${evt.city}. Org: ${evt.organizer}`,
      savedAt: new Date().toISOString(),
      details: {
        eventId: evt.id,
        officialUrl: evt.officialUrl,
      },
    };
    saveWorkspaceLeads([newLead, ...workspaceLeads]);
  };

  // AI Matchmaker candidate save handler
  const handleSaveLeadFromMatch = (cand: MatchCandidate, queryContext: string) => {
    const newLead: WorkspaceLead = {
      id: `match-${cand.businessId}-${Date.now()}`,
      title: `${cand.businessName} (AI Match ${cand.matchScore}%)`,
      category: 'business',
      country: cand.country,
      stage: 'Qualified',
      notes: `Next Action: ${cand.nextAction}. Dilligence: ${cand.suggestedQuestions.slice(0, 1).join(' ')}`,
      savedAt: new Date().toISOString(),
      details: {
        businessId: cand.businessId,
        matchScore: cand.matchScore,
        matchRationale: cand.matchRationale,
        queryContext,
      },
    };
    saveWorkspaceLeads([newLead, ...workspaceLeads]);
  };

  // Trade Desk corridor save handler
  const handleSaveCorridor = (res: TradeReadinessResult) => {
    const newLead: WorkspaceLead = {
      id: `corridor-${Date.now()}`,
      title: `Trade Corridor: ${res.commodity} (${res.origin} → ${res.destination})`,
      category: 'sourcing_rfq',
      country: res.destination,
      stage: 'In Review',
      notes: `HS Code: ${res.hsCodeEstimated}. Mandatory Documents: ${res.documentationChecklist.filter((d) => d.mandatory).map((d) => d.documentName).join(', ')}`,
      savedAt: new Date().toISOString(),
      details: {
        commodity: res.commodity,
        origin: res.origin,
        destination: res.destination,
        intendedUse: res.intendedUse,
      },
    };
    saveWorkspaceLeads([newLead, ...workspaceLeads]);
  };

  // Lead updates
  const handleUpdateLeadStage = (id: string, stage: WorkspaceLead['stage']) => {
    saveWorkspaceLeads(
      workspaceLeads.map((l) => (l.id === id ? { ...l, stage } : l))
    );
  };

  const handleUpdateLeadNotes = (id: string, notes: string) => {
    saveWorkspaceLeads(
      workspaceLeads.map((l) => (l.id === id ? { ...l, notes } : l))
    );
  };

  const handleRemoveLead = (id: string) => {
    saveWorkspaceLeads(workspaceLeads.filter((l) => l.id !== id));
  };

  const handleAddCustomRfq = (lead: WorkspaceLead) => {
    saveWorkspaceLeads([lead, ...workspaceLeads]);
  };

  // Navigations with query context
  const handleLaunchMatchmakingWithPrompt = (p: string) => {
    setMatchmakingPrompt(p);
    setCurrentTab('matchmaking');
  };

  const handleInitiateMatchmakingWithBiz = (biz: AgriBusiness) => {
    const p = `Evaluate candidate partnership with ${biz.name} (${biz.country}) for products: ${biz.products.slice(0, 2).join(', ')}. Target export corridor: ${biz.exportDestinations.slice(0, 2).join(' or ')}.`;
    setMatchmakingPrompt(p);
    setCurrentTab('matchmaking');
  };

  const handleOpenTradeReadinessFromMatch = (
    commodity: string,
    origin: string,
    destination: string
  ) => {
    setTradeDeskParams({ commodity, origin, destination });
    setCurrentTab('trade-desk');
  };

  const isBusinessSaved = (id: string) =>
    workspaceLeads.some((l) => l.id === `biz-${id}` || l.details?.businessId === id);

  const isEventSaved = (id: string) =>
    workspaceLeads.some((l) => l.id === `evt-${id}` || l.details?.eventId === id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        userRole={userRole}
        onRoleChange={setUserRole}
        savedCount={workspaceLeads.length}
        onOpenRfqModal={() => setIsRfqModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {currentTab === 'discover' && (
          <DiscoverView
            businesses={SEED_BUSINESSES}
            events={SEED_EVENTS}
            onNavigate={setCurrentTab}
            onLaunchMatchmaking={handleLaunchMatchmakingWithPrompt}
            onSelectBusiness={(biz) => {
              setCurrentTab('businesses');
            }}
            onSelectEvent={(evt) => {
              setCurrentTab('events');
            }}
          />
        )}

        {currentTab === 'events' && (
          <EventsView
            events={SEED_EVENTS}
            onSaveEvent={handleSaveEvent}
            isEventSaved={isEventSaved}
          />
        )}

        {currentTab === 'businesses' && (
          <BusinessesView
            businesses={SEED_BUSINESSES}
            onSaveBusiness={handleSaveBusiness}
            isBusinessSaved={isBusinessSaved}
            onInitiateMatchmakingWithBiz={handleInitiateMatchmakingWithBiz}
          />
        )}

        {currentTab === 'matchmaking' && (
          <MatchmakingView
            initialPrompt={matchmakingPrompt}
            businesses={SEED_BUSINESSES}
            onSaveLeadFromMatch={handleSaveLeadFromMatch}
            onOpenTradeReadiness={handleOpenTradeReadinessFromMatch}
          />
        )}

        {currentTab === 'trade-desk' && (
          <TradeDeskView
            initialCommodity={tradeDeskParams.commodity}
            initialOrigin={tradeDeskParams.origin}
            initialDestination={tradeDeskParams.destination}
            onSaveCorridorToWorkspace={handleSaveCorridor}
          />
        )}

        {currentTab === 'workspace' && (
          <WorkspaceView
            leads={workspaceLeads}
            onUpdateLeadStage={handleUpdateLeadStage}
            onUpdateLeadNotes={handleUpdateLeadNotes}
            onRemoveLead={handleRemoveLead}
            onOpenNewRfqModal={() => setIsRfqModalOpen(true)}
          />
        )}

        {currentTab === 'admin' && <AdminView />}
      </main>

      {/* Sourcing RFQ Creation Modal */}
      <RfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        onSubmitRfq={handleAddCustomRfq}
        onLaunchMatchmaking={handleLaunchMatchmakingWithPrompt}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-8 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-slate-400">
              AEIT — Global Agricultural Trade Intelligence, Events & Business Connectivity
            </p>
            <p className="text-[11px] text-slate-600">
              Operating under the AEIT Master Standard: Evidence before assertions. Trust is multi-dimensional. No unverified trade assurances.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Server Gemini 3.8 Flash Active</span>
            <span>•</span>
            <span>NAK & SASA Verified</span>
            <span>•</span>
            <span>CAPQ Registry Linked</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
