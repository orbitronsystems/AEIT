'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Search,
  Bookmark,
  Building,
  Check,
  X,
  Award,
  Sparkles,
} from 'lucide-react';
import { AgriEvent } from '@/lib/types';

interface EventsViewProps {
  events: AgriEvent[];
  onSaveEvent: (event: AgriEvent) => void;
  isEventSaved: (id: string) => boolean;
}

export default function EventsView({
  events,
  onSaveEvent,
  isEventSaved,
}: EventsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<AgriEvent | null>(null);

  const categories = ['All', ...Array.from(new Set(events.map((e) => e.category)))];

  const filteredEvents = events.filter((evt) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      evt.name.toLowerCase().includes(term) ||
      evt.city.toLowerCase().includes(term) ||
      evt.country.toLowerCase().includes(term) ||
      evt.topics.some((t) => t.toLowerCase().includes(term)) ||
      (evt.featuredExhibitors && evt.featuredExhibitors.some((ex) => ex.toLowerCase().includes(term)));

    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesFormat = selectedFormat === 'All' || evt.format === selectedFormat;

    return matchesSearch && matchesCat && matchesFormat;
  });

  return (
    <div className="space-y-6 py-2 font-sans text-[#14100c]">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 luxury-card-shadow space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0f5a28]">
          <Calendar className="h-4 w-4" />
          <span>ARM D — Agricultural Expos, Summits & International Trade Missions</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#14100c] tracking-tight">
          Global Agricultural Event Intelligence & Trade Delegations
        </h1>
        <p className="text-xs text-[#5c5246] max-w-3xl leading-relaxed">
          Discover vetted international trade fairs, machinery demonstrations, and bilateral buyer-seller summits. Every date, venue, and registration URL is cross-referenced with official organizers to eliminate stale or unverified listings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search expos by keyword, country, machinery type, or exhibitor (e.g. Hannover, Cairo, GRIMME)..."
            className="w-full rounded-2xl border border-[#e2d9cd] bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#14100c] placeholder-[#a89f91] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-all luxury-card-shadow"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-2xl border border-[#e2d9cd] bg-white px-3.5 py-2.5 text-xs text-[#14100c] font-bold outline-none focus:border-[#d4af37] luxury-card-shadow cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="rounded-2xl border border-[#e2d9cd] bg-white px-3.5 py-2.5 text-xs text-[#14100c] font-bold outline-none focus:border-[#d4af37] luxury-card-shadow cursor-pointer"
          >
            <option value="All">All Formats</option>
            <option value="In-Person">In-Person Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => {
          const saved = isEventSaved(evt.id);
          return (
            <div
              key={evt.id}
              className="rounded-2xl border border-[#e2d9cd] bg-white p-5 luxury-card-shadow hover:border-[#0f5a28]/60 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-md bg-[#f0f7f2] border border-[#bbf7d0] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#14532d]">
                    {evt.status}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#78716c]">
                    <span>{evt.format}</span>
                    <span>·</span>
                    <span className="text-[#d97706] font-bold">Tier-1 Expo</span>
                  </div>
                </div>

                <div>
                  <h3
                    onClick={() => setSelectedEvent(evt)}
                    className="cursor-pointer text-sm font-bold text-[#14100c] hover:text-[#0f5a28] transition-colors line-clamp-2"
                  >
                    {evt.name}
                  </h3>
                  <p className="text-xs text-[#0f5a28] font-bold mt-0.5">
                    {evt.category}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-[#14100c] rounded-xl bg-[#fbf9f5] p-2.5 border border-[#e2d9cd] font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#0f5a28] shrink-0" />
                    <span className="truncate">
                      {evt.venue}, {evt.city}, {evt.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[#0f5a28] shrink-0" />
                    <span className="tabular-nums font-bold">
                      {evt.startDate} — {evt.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#78716c] text-[11px]">
                    <Building className="h-3.5 w-3.5 text-[#a89f91] shrink-0" />
                    <span className="truncate">Organizer: {evt.organizer}</span>
                  </div>
                </div>

                <p className="text-xs text-[#5c5246] line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                {/* Topics Separator */}
                <div className="text-[#78716c] text-xs truncate">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#a89f91]">Themes: </span>
                  <span className="text-[#14100c] font-medium">{evt.topics.slice(0, 3).join(' · ')}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSaveEvent(evt)}
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
                      <span>Save Expo</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="rounded-xl border border-[#c7bbb0] bg-white px-3 py-1.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] cursor-pointer"
                  >
                    Briefing
                  </button>
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-[#0f5a28] hover:text-[#166534]"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="rounded-3xl border border-[#e2d9cd] bg-white p-12 text-center space-y-2 luxury-card-shadow">
          <Calendar className="mx-auto h-8 w-8 text-[#a89f91]" />
          <h3 className="text-sm font-bold text-[#14100c]">No agricultural events match your filters</h3>
          <p className="text-xs text-[#5c5246]">
            Try adjusting your search terms or reset category filters.
          </p>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#120f0c]/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#e2d9cd] bg-white p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-[#f0ece1] pb-4">
              <div>
                <span className="rounded-md bg-[#f0f7f2] border border-[#bbf7d0] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#14532d]">
                  {selectedEvent.status}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#14100c] mt-2">{selectedEvent.name}</h2>
                <p className="text-xs text-[#0f5a28] font-bold">{selectedEvent.category}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-xl p-1 text-[#78716c] hover:bg-[#fbf9f5] hover:text-[#14100c] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl bg-[#fbf9f5] p-4 border border-[#e2d9cd] text-xs font-mono">
              <div>
                <span className="text-[#78716c]">Event Dates:</span>
                <p className="font-bold text-[#14100c] mt-0.5 tabular-nums">
                  {selectedEvent.startDate} — {selectedEvent.endDate}
                </p>
              </div>
              <div>
                <span className="text-[#78716c]">Venue & City:</span>
                <p className="font-bold text-[#14100c] mt-0.5">
                  {selectedEvent.venue}, {selectedEvent.city}, {selectedEvent.country}
                </p>
              </div>
              <div>
                <span className="text-[#78716c]">Authorized Organizer:</span>
                <p className="font-bold text-[#14100c] mt-0.5">{selectedEvent.organizer}</p>
              </div>
              <div>
                <span className="text-[#78716c]">Ingestion Audit:</span>
                <p className="font-bold text-[#0f5a28] mt-0.5">
                  {selectedEvent.confidence} (Verified {selectedEvent.lastChecked})
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a89f91]">
                Official Event Scope & Industry Focus
              </h4>
              <p className="text-xs sm:text-sm text-[#14100c] leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {selectedEvent.featuredExhibitors && selectedEvent.featuredExhibitors.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a89f91]">
                  Featured Commercial Exhibitors in AEIT Directory
                </h4>
                <div className="text-[#14100c] text-xs font-mono font-bold">
                  {selectedEvent.featuredExhibitors.join(' · ')}
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a89f91]">
                Topics & Innovation Tracks
              </h4>
              <div className="text-[#14100c] text-xs font-semibold">
                {selectedEvent.topics.join(' · ')}
              </div>
            </div>

            <div className="pt-4 border-t border-[#f0ece1] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => {
                  onSaveEvent(selectedEvent);
                  setSelectedEvent(null);
                }}
                className="rounded-xl border border-[#c7bbb0] bg-white px-4 py-2.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] cursor-pointer"
              >
                {isEventSaved(selectedEvent.id) ? 'Saved in Workspace' : 'Save Event to Workspace'}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={selectedEvent.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#c7bbb0] bg-white px-3.5 py-2.5 text-xs font-bold text-[#14100c] hover:bg-[#fbf9f5] flex items-center gap-1.5"
                >
                  <span>Organizer Site</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={selectedEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#15803d] to-[#0f5a28] hover:from-[#166534] hover:to-[#14532d] px-4 py-2.5 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Official Registration</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
