'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Bookmark,
  Calendar,
  Building2,
  Trash2,
  PlusCircle,
  Edit3,
  Check,
  Download,
  FileText,
  Sparkles,
} from 'lucide-react';
import { WorkspaceLead } from '@/lib/types';

interface WorkspaceViewProps {
  leads: WorkspaceLead[];
  onUpdateLeadStage: (id: string, stage: WorkspaceLead['stage']) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onRemoveLead: (id: string) => void;
  onOpenNewRfqModal: () => void;
}

const STAGES: { stage: WorkspaceLead['stage']; label: string; color: string }[] = [
  { stage: 'Identified', label: '1. Identified', color: 'border-[#e2d9cd] text-[#5c5246] bg-[#fbf9f5]' },
  { stage: 'Contacted', label: '2. Contacted', color: 'border-[#bfdbfe] text-[#1e40af] bg-[#dbeafe]/50' },
  { stage: 'In Review', label: '3. In Diligence', color: 'border-[#fde68a] text-[#92400e] bg-[#fef3c7]/50' },
  { stage: 'Qualified', label: '4. Qualified', color: 'border-[#99f6e4] text-[#0f766e] bg-[#ccfbf1]/50' },
  { stage: 'Inquiry Sent', label: '5. RFQ Dispatched', color: 'border-[#bbf7d0] text-[#14532d] bg-[#f0f7f2]' },
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLeads = leads.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'land_lease') {
      return item.title.toLowerCase().includes('land') || item.title.toLowerCase().includes('hectare');
    }
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

  const exportWorkspaceJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `AEIT_Workspace_Pipeline_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyLeadDetails = (lead: WorkspaceLead) => {
    const text = `${lead.title}\nCategory: ${lead.category.toUpperCase()}\nStage: ${lead.stage}\nCountry: ${lead.country || 'N/A'}\nNotes: ${lead.notes || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 py-2 font-sans text-[#14100c]">
      {/* Enterprise Header Banner */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 luxury-card-shadow space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0f5a28]">
              <Briefcase className="h-4 w-4" />
              <span>Private Trade Desk & Sourcing Pipeline</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#14100c] tracking-tight">
              Agricultural Trade Pipeline & RFQ Deal Room
            </h1>
            <p className="text-xs text-[#5c5246] max-w-3xl leading-relaxed">
              Consolidate verified supplier dossiers, scheduled international expos, and active requests for quotation (RFQs). Advance leads through structured biosecurity and commercial diligence milestones with audit-ready notes.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={onOpenNewRfqModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] border border-[#d4af37]/30 px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
            >
              <PlusCircle className="h-4 w-4 text-[#f3e6c4]" />
              <span>Create Sourcing RFQ</span>
            </button>
            <button
              onClick={exportWorkspaceJSON}
              disabled={leads.length === 0}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#c7bbb0] bg-white px-3.5 py-2 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Dossier (JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Progression KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
        {STAGES.map((s, idx) => {
          const count = leads.filter((l) => l.stage === s.stage).length;
          return (
            <div
              key={s.stage}
              className={`rounded-2xl border p-4 space-y-1 transition-all luxury-card-shadow ${
                count > 0 ? s.color : 'border-[#e2d9cd] bg-white text-[#78716c]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold">
                  {s.label}
                </span>
                <span className="text-[10px] opacity-70 font-bold">Stage {idx + 1}</span>
              </div>
              <p className="text-xl font-black text-[#14100c] tabular-nums">{count}</p>
              <div className="w-full bg-[#e2d9cd] rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#0f5a28] h-full rounded-full transition-all duration-500"
                  style={{ width: `${leads.length > 0 ? (count / leads.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#e2d9cd] bg-white p-1 text-xs luxury-card-shadow">
          {[
            { id: 'all', label: `All Deals (${leads.length})` },
            { id: 'business', label: 'Suppliers & Farms' },
            { id: 'land_lease', label: 'Farmland Leases' },
            { id: 'event', label: 'Expos & Summits' },
            { id: 'sourcing_rfq', label: 'Sourcing RFQs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`rounded-xl px-3.5 py-2 font-bold transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#fbf9f5] text-[#0f5a28] font-extrabold border border-[#e2d9cd]'
                  : 'text-[#5c5246] hover:text-[#14100c]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#5c5246] flex items-center gap-2 self-end sm:self-center font-mono font-bold">
          <span>Active Pipeline: <strong className="text-[#0f5a28]">{filteredLeads.length}</strong> records</span>
        </div>
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="rounded-3xl border border-[#e2d9cd] bg-white p-12 text-center space-y-3 luxury-card-shadow">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#bbf7d0] text-[#0f5a28]">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#14100c]">Your Workspace Pipeline is Clean</h3>
            <p className="text-xs text-[#5c5246] max-w-md mx-auto leading-relaxed">
              Bookmark verified suppliers from the Directory, save upcoming international agricultural expos, or launch an RFQ to track transactions here.
            </p>
          </div>
          <button
            onClick={onOpenNewRfqModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] px-5 py-2.5 text-xs font-bold text-white hover:from-[#166534] hover:to-[#14532d] transition-colors cursor-pointer shadow-md"
          >
            <PlusCircle className="h-4 w-4 text-[#f3e6c4]" />
            <span>Create First Sourcing RFQ</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[#e2d9cd] bg-white p-5 sm:p-6 space-y-3.5 luxury-card-shadow transition-all hover:border-[#0f5a28]/60 hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f0f7f2] text-[#0f5a28] border border-[#bbf7d0] shrink-0">
                    {item.category === 'business' && <Building2 className="h-5 w-5" />}
                    {item.category === 'event' && <Calendar className="h-5 w-5" />}
                    {item.category === 'sourcing_rfq' && <FileText className="h-5 w-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#14100c] leading-tight">
                        {item.title}
                      </h3>
                      {item.country && (
                        <span className="font-mono text-[10px] text-[#5c5246] bg-[#fbf9f5] border border-[#e2d9cd] px-2 py-0.5 rounded-md font-bold">
                          {item.country}
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-[#14532d] bg-[#f0f7f2] border border-[#bbf7d0] px-2 py-0.5 rounded-md font-bold uppercase">
                        {item.category.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-[#78716c] flex items-center gap-2 font-mono font-medium">
                      <span>Saved: {new Date(item.savedAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>ID: {item.id}</span>
                    </p>
                  </div>
                </div>

                {/* Stage Selector & Actions */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <div className="flex items-center gap-1.5 bg-[#fbf9f5] border border-[#e2d9cd] rounded-xl px-3 py-1.5">
                    <span className="text-[11px] text-[#78716c] font-mono font-bold">Stage:</span>
                    <select
                      value={item.stage}
                      onChange={(e) =>
                        onUpdateLeadStage(item.id, e.target.value as WorkspaceLead['stage'])
                      }
                      className="bg-transparent text-xs font-bold text-[#0f5a28] outline-none cursor-pointer"
                    >
                      {STAGES.map((s) => (
                        <option key={s.stage} value={s.stage} className="bg-white text-[#14100c]">
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleCopyLeadDetails(item)}
                    className="p-2 text-[#5c5246] hover:text-[#14100c] rounded-xl bg-white border border-[#c7bbb0] hover:bg-[#fbf9f5] transition-colors cursor-pointer"
                    title="Copy Lead Summary"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-[#0f5a28]" />
                    ) : (
                      <Bookmark className="h-3.5 w-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onRemoveLead(item.id)}
                    className="p-2 text-[#5c5246] hover:text-[#dc2626] rounded-xl bg-white border border-[#c7bbb0] hover:bg-[#fbf9f5] transition-colors cursor-pointer"
                    title="Remove from Workspace"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Extended Details Preview */}
              {item.details && (
                <div className="rounded-2xl bg-[#fbf9f5] p-3.5 text-xs text-[#14100c] border border-[#e2d9cd] font-mono space-y-1.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {item.details.commodity && (
                      <div>
                        <span className="text-[10px] uppercase text-[#78716c] font-bold block">Target Commodity:</span>
                        <span className="font-bold text-[#14100c]">{item.details.commodity}</span>
                      </div>
                    )}
                    {item.details.quantity && (
                      <div>
                        <span className="text-[10px] uppercase text-[#78716c] font-bold block">Volume:</span>
                        <span className="font-bold text-[#0f5a28] tabular-nums">{item.details.quantity} {item.details.unit || ''}</span>
                      </div>
                    )}
                    {item.details.destination && (
                      <div>
                        <span className="text-[10px] uppercase text-[#78716c] font-bold block">Destination Port:</span>
                        <span className="font-bold text-[#14100c]">{item.details.destination}</span>
                      </div>
                    )}
                    {item.details.matchScore && (
                      <div>
                        <span className="text-[10px] uppercase text-[#78716c] font-bold block">AI Compatibility:</span>
                        <span className="font-bold text-[#0f5a28] tabular-nums">{item.details.matchScore}% Verified Fit</span>
                      </div>
                    )}
                  </div>

                  {item.details.matchRationale && (
                    <div className="pt-1.5 border-t border-[#e2d9cd] text-[#5c5246] italic text-[11px] font-sans">
                      &ldquo;{item.details.matchRationale}&rdquo;
                    </div>
                  )}
                </div>
              )}

              {/* Private Diligence Notes */}
              <div className="pt-2 border-t border-[#f0ece1] text-xs">
                {editingNotesId === item.id ? (
                  <div className="space-y-2.5">
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      placeholder="Add private diligence notes, payment terms (LC, CAD), phytosanitary sample test numbers, or delivery windows..."
                      className="w-full rounded-2xl border border-[#e2d9cd] bg-[#fbf9f5] p-3 text-xs text-[#14100c] outline-none focus:border-[#d4af37] font-sans"
                      rows={3}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveNotes(item.id)}
                        className="rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] px-4 py-2 text-xs font-bold text-white hover:from-[#166534] cursor-pointer shadow-xs"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="text-xs text-[#5c5246] hover:text-[#14100c] px-2 py-1 cursor-pointer font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#5c5246]">
                    <p className="text-xs leading-relaxed">
                      {item.notes ? (
                        <span>
                          <strong className="text-[#14100c] font-bold font-mono text-[11px]">Diligence Log:</strong> {item.notes}
                        </span>
                      ) : (
                        <span className="italic text-[#78716c]">No private diligence notes logged for this entry yet.</span>
                      )}
                    </p>
                    <button
                      onClick={() => handleStartEditNotes(item)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#0f5a28] hover:text-[#166534] font-bold self-start sm:self-auto shrink-0 cursor-pointer"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>{item.notes ? 'Edit Log' : 'Add Diligence Log'}</span>
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
