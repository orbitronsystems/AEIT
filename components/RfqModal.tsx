'use client';

import React, { useState } from 'react';
import { FileText, X, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { WorkspaceLead } from '@/lib/types';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRfq: (lead: WorkspaceLead) => void;
  onLaunchMatchmaking: (prompt: string) => void;
}

export default function RfqModal({
  isOpen,
  onClose,
  onSubmitRfq,
  onLaunchMatchmaking,
}: RfqModalProps) {
  const [commodity, setCommodity] = useState('Certified Seed Potatoes');
  const [variety, setVariety] = useState('Spunta / Arizona (Class A)');
  const [quantity, setQuantity] = useState('27');
  const [unit, setUnit] = useState('Metric Tonnes');
  const [origin, setOrigin] = useState('Netherlands or Scotland');
  const [destination, setDestination] = useState('Alexandria Port, Egypt');
  const [deliveryWindow, setDeliveryWindow] = useState('Nov 2026 – Jan 2027');
  const [incoterms, setIncoterms] = useState('CIF Alexandria');
  const [intendedUse, setIntendedUse] = useState('Planting / Seed Propagation');
  const [notes, setNotes] = useState('Zero tolerance for Brown Rot (Ralstonia solanacearum). Calibration 28-55mm screen sizing.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = `RFQ: ${quantity} ${unit} ${commodity} (${variety})`;
    const newLead: WorkspaceLead = {
      id: `rfq-${Date.now()}`,
      title,
      category: 'sourcing_rfq',
      country: destination,
      stage: 'Identified',
      notes: `Target Incoterm: ${incoterms}. Delivery: ${deliveryWindow}. Specifications: ${notes}`,
      savedAt: new Date().toISOString(),
      details: {
        commodity,
        variety,
        quantity: Number(quantity) || 0,
        unit,
        origin,
        destination,
        deliveryWindow,
        incoterms,
        intendedUse,
      },
    };

    onSubmitRfq(newLead);
    onClose();
  };

  const handleCreateAndRunAI = () => {
    const prompt = `Find potential suppliers of ${variety ? variety + ' ' : ''}${commodity} in ${origin || 'any origin'} that could supply ${quantity} ${unit} to ${destination} under ${incoterms}. Intended use: ${intendedUse}.`;
    onLaunchMatchmaking(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Post Sourcing Request (RFQ)</h2>
              <p className="text-xs text-slate-400">Structured international procurement specification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Commodity / Crop</label>
              <input
                type="text"
                required
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                placeholder="e.g. Seed Potatoes, Drip Lines, Valencia Oranges"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Variety or Technical Grade</label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Spunta (Class A), Heavy-Wall UniRam"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Quantity</label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Unit of Measure</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              >
                <option value="Metric Tonnes">Metric Tonnes (MT)</option>
                <option value="40ft Reefer Containers">40ft Reefer Containers</option>
                <option value="Hectares (Land Lease)">Hectares (Land Lease)</option>
                <option value="Meters (Drip Line)">Meters (Drip Line)</option>
                <option value="Machinery Units">Machinery Units</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Origin Preference</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Netherlands, Scotland, South Africa, Open"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Destination Port & Country</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Alexandria, Egypt; Rotterdam; Cape Town"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Target Delivery Period</label>
              <input
                type="text"
                value={deliveryWindow}
                onChange={(e) => setDeliveryWindow(e.target.value)}
                placeholder="e.g. Nov 2026 – Jan 2027"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Preferred Incoterms</label>
              <select
                value={incoterms}
                onChange={(e) => setIncoterms(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              >
                <option value="CIF Alexandria">CIF Alexandria / Destination Port</option>
                <option value="FOB Loading Port">FOB Loading Port</option>
                <option value="CFR Destination">CFR Destination Port</option>
                <option value="DAP Buyer Facility">DAP Buyer Facility</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Intended Product Use & Regulatory Channel</label>
            <select
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
            >
              <option value="Planting / Seed Propagation">Planting / Seed Propagation (Strict Phytosanitary)</option>
              <option value="Direct Consumption / Retail">Direct Consumption / Retail</option>
              <option value="Industrial Food Processing">Industrial Food Processing</option>
              <option value="Farm Infrastructure Deployment">Farm Infrastructure Deployment</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Technical Specifications & Phytosanitary Requirements</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specify sizing, certifications (NAK, SASA, GlobalGAP), allowable pest thresholds, payment terms..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              By posting, this sourcing requirement will be formatted into a structured RFQ saved in your Workspace and ready for immediate AI partner matching.
            </span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCreateAndRunAI}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Save & Launch AI Match</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Save RFQ to Workspace
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
