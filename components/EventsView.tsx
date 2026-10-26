'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Tag,
  Building,
  Check,
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
    const matchesSearch =
      evt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (evt.featuredExhibitors && evt.featuredExhibitors.some((ex) => ex.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesFormat = selectedFormat === 'All' || evt.format === selectedFormat;

    return matchesSearch && matchesCat && matchesFormat;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Calendar className="h-4 w-4" />
          <span>ARM D — Agricultural Expos, Summits & Trade Missions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Global Agricultural Event Intelligence
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Discover vetted international trade fairs, machinery demonstrations, and bilateral buyer-seller summits. Every date, venue, and registration URL is cross-referenced with official organizers to prevent stale or fabricated listings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search expos by keyword, country, machinery type, or exhibitor (e.g., Hannover, Egypt, GRIMME)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="h-3.5 w-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
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
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="All">All Formats</option>
            <option value="In-Person">In-Person Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((evt) => {
          const saved = isEventSaved(evt.id);
          return (
            <div
              key={evt.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-emerald-500/5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    {evt.status}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                    {evt.format}
                  </span>
                </div>

                <div>
                  <h3
                    onClick={() => setSelectedEvent(evt)}
                    className="cursor-pointer text-base font-bold text-white hover:text-emerald-300 transition-colors line-clamp-2"
                  >
                    {evt.name}
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-medium mt-0.5">
                    {evt.category}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {evt.venue}, {evt.city}, {evt.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>
                      {evt.startDate} to {evt.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-400">Org: {evt.organizer}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>

                {/* Topics Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {evt.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-300"
                    >
                      {topic}
                    </span>
                  ))}
                  {evt.topics.length > 3 && (
                    <span className="text-[10px] text-slate-500">
                      +{evt.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSaveEvent(evt)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
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
                      <span>Save to Workspace</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="text-xs text-slate-300 hover:text-white font-medium"
                  >
                    View
                  </button>
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Official</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <Calendar className="mx-auto h-8 w-8 text-slate-600" />
          <h3 className="text-base font-semibold text-white">No agricultural events match your filters</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or reset category filters.
          </p>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  {selectedEvent.status}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{selectedEvent.name}</h2>
                <p className="text-xs text-emerald-400">{selectedEvent.category}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-slate-950/60 p-4 border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400">Dates:</span>
                <p className="font-semibold text-white">
                  {selectedEvent.startDate} to {selectedEvent.endDate}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Venue & City:</span>
                <p className="font-semibold text-white">
                  {selectedEvent.venue}, {selectedEvent.city}, {selectedEvent.country}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Organizer:</span>
                <p className="font-semibold text-white">{selectedEvent.organizer}</p>
              </div>
              <div>
                <span className="text-slate-400">Provenance Confidence:</span>
                <p className="font-semibold text-emerald-400">{selectedEvent.confidence} (Verified {selectedEvent.lastChecked})</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Event Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {selectedEvent.featuredExhibitors && selectedEvent.featuredExhibitors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Featured Exhibitors in Directory
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.featuredExhibitors.map((ex, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Focus Industry Themes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedEvent.topics.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300 border border-emerald-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  onSaveEvent(selectedEvent);
                  setSelectedEvent(null);
                }}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700"
              >
                {isEventSaved(selectedEvent.id) ? 'Saved in Workspace' : 'Save Event to Workspace'}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={selectedEvent.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-700 flex items-center gap-1"
                >
                  <span>Organizer Site</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={selectedEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 flex items-center gap-1"
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
