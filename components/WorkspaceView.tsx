'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Bookmark,
  Calendar,
  Building2,
  Trash2,
  PlusCircle,
  ExternalLink,
  Edit3,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  FileText,
  Ship,
} from 'lucide-react';
import { WorkspaceLead } from '@/lib/types';

interface WorkspaceViewProps {
  leads: WorkspaceLead[];
  onUpdateLeadStage: (id: string, stage: WorkspaceLead['stage']) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onRemoveLead: (id: string) => void;
  onOpenNewRfqModal: () => void;
}

const STAGES: WorkspaceLead['stage'][] = [
  'Identified',
  'Contacted',
  'In Review',
  'Qualified',
  'Inquiry Sent',
];

export default function WorkspaceView({
  leads,
  onUpdateLeadStage,
  onUpdateLeadNotes,
  onRemoveLead,
  onOpenNewRfqModal,
}: WorkspaceViewProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  const filteredLeads = leads.filter((item) => {
    if (filterType === 'all') return true;
    return item.category === filterType;
  });

  const handleStartEditNotes = (lead: WorkspaceLead) => {
    setEditingNotesId(lead.id);
    setNotesDraft(lead.notes || '');
  };

  const handleSaveNotes = (id: string) => {
    onUpdateLeadNotes(id, notesDraft);
    setEditingNotesId(null);
  };

  const exportWorkspace = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `AEIT_Workspace_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Briefcase className="h-4 w-4" />
            <span>Phase 8 — Business Workspace & Sourcing Pipeline</span>
          </div>
          <button
            onClick={exportWorkspace}
            disabled={leads.length === 0}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Pipeline JSON</span>
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Active Opportunities, Leads & Sourcing RFQs
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Manage qualified supplier leads, saved industry expos, and active requests for quotation (RFQs). Confidential sourcing data is partitioned and stored securely for your authorized session.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 p-1 text-xs">
          {[
            { id: 'all', label: `All Records (${leads.length})` },
            { id: 'business', label: 'Suppliers & Farms' },
            { id: 'event', label: 'Expos' },
            { id: 'sourcing_rfq', label: 'RFQs & Corridors' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                filterType === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenNewRfqModal}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Sourcing Request (RFQ)</span>
        </button>
      </div>

      {/* Pipeline Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {STAGES.map((stg) => {
          const count = leads.filter((l) => l.stage === stg).length;
          return (
            <div
              key={stg}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-1"
            >
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                {stg}
              </span>
              <p className="text-xl font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Leads List / Board */}
      {filteredLeads.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <Briefcase className="mx-auto h-8 w-8 text-slate-600" />
          <h3 className="text-base font-semibold text-white">Your Workspace is empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Save suppliers from the Directory, bookmark agricultural Expos, or post a new Sourcing RFQ to populate your pipeline.
          </p>
          <button
            onClick={onOpenNewRfqModal}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Create First Sourcing RFQ
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 transition-all hover:border-slate-700 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 shrink-0">
                    {item.category === 'business' && <Building2 className="h-4 w-4" />}
                    {item.category === 'event' && <Calendar className="h-4 w-4" />}
                    {item.category === 'sourcing_rfq' && <FileText className="h-4 w-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                        {item.country || 'International'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Saved: {new Date(item.savedAt).toLocaleDateString()} • Type: {item.category.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Stage Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Stage:</span>
                  <select
                    value={item.stage}
                    onChange={(e) =>
                      onUpdateLeadStage(item.id, e.target.value as WorkspaceLead['stage'])
                    }
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-medium text-emerald-300 outline-none focus:border-emerald-500"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => onRemoveLead(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove from Workspace"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* RFQ / Details preview if present */}
              {item.details && (
                <div className="rounded-lg bg-slate-950/60 p-3 text-xs text-slate-300 border border-slate-800/80 space-y-1">
                  {item.details.commodity && (
                    <p>
                      <strong>Target Commodity:</strong> {item.details.commodity} ({item.details.quantity || ''} {item.details.unit || ''})
                    </p>
                  )}
                  {item.details.matchScore && (
                    <p>
                      <strong>AI Match Score:</strong> {item.details.matchScore}%
                    </p>
                  )}
                  {item.details.matchRationale && (
                    <p className="text-slate-400 italic">
                      &ldquo;{item.details.matchRationale}&rdquo;
                    </p>
                  )}
                </div>
              )}

              {/* Private Notes Section */}
              <div className="pt-2 border-t border-slate-800/80 text-xs">
                {editingNotesId === item.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      placeholder="Enter internal business notes, proforma invoice details, or target delivery windows..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-white outline-none focus:border-emerald-500"
                      rows={3}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveNotes(item.id)}
                        className="rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-slate-400">
                    <p className="text-[11px] italic">
                      {item.notes ? (
                        <span>
                          <strong className="text-slate-300">Internal Note:</strong> {item.notes}
                        </span>
                      ) : (
                        <span>No private diligence notes added yet.</span>
                      )}
                    </p>
                    <button
                      onClick={() => handleStartEditNotes(item)}
                      className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>{item.notes ? 'Edit Note' : 'Add Note'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
