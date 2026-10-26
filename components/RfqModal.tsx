'use client';

import React, { useState } from 'react';
import {
  FileText,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
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
  const [notes, setNotes] = useState(
    'Zero tolerance for Brown Rot (Ralstonia solanacearum). Calibration 28-55mm screen sizing. Phytosanitary certificate issued by official NPPO required.'
  );

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

  const applyPreset = (preset: {
    commodity: string;
    variety: string;
    quantity: string;
    unit: string;
    origin: string;
    destination: string;
    deliveryWindow: string;
    incoterms: string;
    intendedUse: string;
    notes: string;
  }) => {
    setCommodity(preset.commodity);
    setVariety(preset.variety);
    setQuantity(preset.quantity);
    setUnit(preset.unit);
    setOrigin(preset.origin);
    setDestination(preset.destination);
    setDeliveryWindow(preset.deliveryWindow);
    setIncoterms(preset.incoterms);
    setIntendedUse(preset.intendedUse);
    setNotes(preset.notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a140e]/60 p-4 backdrop-blur-xs transition-all font-sans text-[#1c1917]">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#e6ded2] bg-white p-6 sm:p-8 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f0ece1] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f7f2] border border-[#bbf7d0] text-[#15803d]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#1a140e] tracking-tight">
                  Structured Sourcing Mandate (RFQ)
                </h2>
                <span className="font-mono text-[10px] font-bold text-[#14532d] bg-[#f0f7f2] border border-[#bbf7d0] px-2 py-0.5 rounded-md">
                  B2B Protocol
                </span>
              </div>
              <p className="text-xs text-[#57534e] mt-0.5">
                Standardized multi-attribute procurement specification with biosecurity parameterization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#78716c] hover:bg-[#faf8f5] hover:text-[#1c1917] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-[#78716c] text-[11px] font-bold">Templates:</span>
          <button
            type="button"
            onClick={() =>
              applyPreset({
                commodity: 'Certified Seed Potatoes',
                variety: 'Spunta / Arizona (Class A)',
                quantity: '27',
                unit: 'Metric Tonnes',
                origin: 'Netherlands or Scotland',
                destination: 'Alexandria Port, Egypt',
                deliveryWindow: 'Nov 2026 – Jan 2027',
                incoterms: 'CIF Alexandria',
                intendedUse: 'Planting / Seed Propagation',
                notes:
                  'Zero tolerance for Ralstonia solanacearum (Brown Rot). Calibration 28-55mm screen sizing. Official NAK / SASA seal required.',
              })
            }
            className="rounded-lg bg-[#faf8f5] border border-[#e6ded2] px-2.5 py-1 text-[#57534e] hover:text-[#1c1917] hover:bg-[#f0ece1] transition-colors text-xs cursor-pointer font-sans font-medium"
          >
            Seed Potatoes (27 MT)
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset({
                commodity: 'Valencia Fresh Oranges',
                variety: 'Midknight / Delta Seedless (Grade 1)',
                quantity: '100',
                unit: 'Metric Tonnes',
                origin: 'South Africa (Limpopo/Western Cape)',
                destination: 'Rotterdam Port, Netherlands',
                deliveryWindow: 'Jul 2026 – Sep 2026',
                incoterms: 'CIF Rotterdam',
                intendedUse: 'Direct Consumption / Retail',
                notes:
                  'EU False Codling Moth (FCM) protocol: Continuous cold treatment at -0.5°C to 0.5°C for minimum 16 days. GlobalGAP certified.',
              })
            }
            className="rounded-lg bg-[#faf8f5] border border-[#e6ded2] px-2.5 py-1 text-[#57534e] hover:text-[#1c1917] hover:bg-[#f0ece1] transition-colors text-xs cursor-pointer font-sans font-medium"
          >
            Fresh Citrus (100 MT)
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset({
                commodity: 'Precision Drip Irrigation Tape',
                variety: 'UniRam / DripNet PC 1.6L/h @ 30cm spacing',
                quantity: '50000',
                unit: 'Meters (Drip Line)',
                origin: 'Israel / European Union',
                destination: 'Alexandria Port, Egypt',
                deliveryWindow: 'May 2026 – Jun 2026',
                incoterms: 'CFR Alexandria',
                intendedUse: 'Farm Infrastructure Deployment',
                notes:
                  'Pressure-compensating emitters, heavy-wall 1.0mm thickness, resistant to UV degradation and saline water clogging.',
              })
            }
            className="rounded-lg bg-[#faf8f5] border border-[#e6ded2] px-2.5 py-1 text-[#57534e] hover:text-[#1c1917] hover:bg-[#f0ece1] transition-colors text-xs cursor-pointer font-sans font-medium"
          >
            Drip Irrigation (50,000m)
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset({
                commodity: 'Agricultural Land Lease',
                variety: 'Equipped Desert Reclamation Soil',
                quantity: '450',
                unit: 'Hectares (Land Lease)',
                origin: 'Egypt (Beheira / Nubaria)',
                destination: 'Local Operational Lease',
                deliveryWindow: 'Q4 2026',
                incoterms: 'DAP Buyer Facility',
                intendedUse: 'Farm Infrastructure Deployment',
                notes:
                  'Requires registered deep groundwater extraction license, 3-phase high-voltage transformer, and sandy-loam soil test report.',
              })
            }
            className="rounded-lg bg-[#faf8f5] border border-[#e6ded2] px-2.5 py-1 text-[#57534e] hover:text-[#1c1917] hover:bg-[#f0ece1] transition-colors text-xs cursor-pointer font-sans font-medium"
          >
            Farmland Lease (450 Ha)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#57534e] font-semibold mb-1">
                Commodity / Crop Category <span className="text-[#15803d]">*</span>
              </label>
              <input
                type="text"
                required
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                placeholder="e.g. Seed Potatoes, Valencia Oranges..."
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-3 py-2 text-[#1c1917] outline-none focus:border-[#15803d] font-mono text-xs shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[#57534e] font-semibold mb-1">
                Variety / Technical Grade / Class
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Spunta (Class A), Heavy-Wall PC"
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-3 py-2 text-[#1c1917] outline-none focus:border-[#15803d] font-mono text-xs shadow-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[#57534e] font-semibold mb-1">
                  Quantity <span className="text-[#15803d]">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-2.5 py-2 text-[#1c1917] outline-none focus:border-[#15803d] font-mono text-xs tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-[#57534e] font-semibold mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-2 py-2 text-[#1c1917] outline-none focus:border-[#15803d] text-xs font-medium shadow-xs cursor-pointer"
                >
                  <option value="Metric Tonnes">Metric Tonnes (MT)</option>
                  <option value="40ft Reefer Containers">40ft Reefer Containers</option>
                  <option value="Hectares (Land Lease)">Hectares (Land Lease)</option>
                  <option value="Meters (Drip Line)">Meters (Drip Line)</option>
                  <option value="Machinery Units">Machinery Units</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#57534e] font-semibold mb-1">Origin Preference</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Netherlands, Scotland, Open"
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-3 py-2 text-[#1c1917] outline-none focus:border-[#15803d] font-mono text-xs shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[#57534e] font-semibold mb-1">
                Destination Port & Country <span className="text-[#15803d]">*</span>
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Alexandria Port, Egypt"
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-3 py-2 text-[#1c1917] outline-none focus:border-[#15803d] font-mono text-xs shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[#57534e] font-semibold mb-1">Preferred Incoterms</label>
              <select
                value={incoterms}
                onChange={(e) => setIncoterms(e.target.value)}
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-2.5 py-2 text-[#1c1917] outline-none focus:border-[#15803d] text-xs font-mono shadow-xs cursor-pointer font-medium"
              >
                <option value="CIF Alexandria">CIF Alexandria / Destination Port</option>
                <option value="FOB Loading Port">FOB Loading Port</option>
                <option value="CFR Destination">CFR Destination Port</option>
                <option value="DAP Buyer Facility">DAP Buyer Facility</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#57534e] font-semibold mb-1">Target Delivery Period</label>
              <input
                type="text"
                value={deliveryWindow}
                onChange={(e) => setDeliveryWindow(e.target.value)}
                placeholder="e.g. Nov 2026 – Jan 2027"
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-3 py-2 text-[#1c1917] outline-none focus:border-[#15803d] font-mono text-xs shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[#57534e] font-semibold mb-1">
                Intended Product Use & Regulatory Channel
              </label>
              <select
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] px-2.5 py-2 text-[#1c1917] outline-none focus:border-[#15803d] text-xs font-medium shadow-xs cursor-pointer"
              >
                <option value="Planting / Seed Propagation">Planting / Seed Propagation (Strict Biosecurity)</option>
                <option value="Direct Consumption / Retail">Direct Consumption / Retail</option>
                <option value="Industrial Food Processing">Industrial Food Processing</option>
                <option value="Farm Infrastructure Deployment">Farm Infrastructure Deployment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#57534e] font-semibold mb-1">
              Technical Specifications, Calibrations & Phytosanitary Requirements
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specify sizing, allowable pest thresholds, certifications (NAK, SASA, GlobalGAP), packaging (50kg jute or 1.2MT big bags)..."
              className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f5] p-2.5 text-[#1c1917] outline-none focus:border-[#15803d] text-xs font-sans shadow-xs"
            />
          </div>

          <div className="rounded-xl bg-[#f0f7f2] p-3 border border-[#bbf7d0] text-xs text-[#1c1917] flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#15803d] shrink-0" />
            <span className="leading-relaxed">
              AEIT Standard: Sourcing requirements are verified for completeness before broadcast. You can save to your private Workspace or immediately launch the AI Matchmaker against verified agribusinesses.
            </span>
          </div>

          <div className="pt-3 border-t border-[#f0ece1] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCreateAndRunAI}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg border border-[#bbf7d0] bg-[#f0f7f2] px-4 py-2 text-xs font-bold text-[#14532d] hover:bg-[#dcfce7] transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-[#15803d]" />
              <span>Save & Launch AI Matchmaker</span>
            </button>

            <div className="w-full sm:w-auto flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#c7bbb0] bg-white px-3 py-1.5 text-xs font-semibold text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#15803d] hover:bg-[#166534] px-4 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
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
