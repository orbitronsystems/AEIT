---
doc: prd
status: approved
---

# AEIT — Product Requirements Document (PRD)

AEIT is a Global Agricultural Trade Intelligence & Business Connectivity SaaS platform for agricultural manufacturers, producers, exporters, importers, and industry event attendees.

Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`, `scope.md > The POC Boundary`.

## The Core Journey
1. **Discover**: User lands on the Global Agricultural Intelligence Portal, reviewing key metrics across the Four Arms (Suppliers, Producers, B2B Trade, Events) and recent vetted opportunities.
2. **Explore Arms**: User filters businesses by role (Manufacturer, Grower, Exporter, Importer), product category (Grains, Seed Potatoes, Drip Irrigation, Greenhouses), country, and verification level.
3. **Event Intelligence**: User browses global agricultural expos (e.g. Agritechnica, Fruit Logistica, Sahara Expo Egypt, NAMPO Harvest Day) with confirmed status, venue, dates, and official registration URLs.
4. **AI Sourcing & Matchmaking**: User submits natural language or structured sourcing requests (e.g., "Find certified seed potato suppliers in the Netherlands or Scotland for 27 MT to Egypt"). The AI extracts specifications and ranks candidates with explainable breakdowns.
5. **Trade-Readiness Check**: User analyzes bilateral trade routes for necessary phytosanitary certificates, import permits, Incoterms, and regulatory risks.
6. **Workspace Action**: User saves matching suppliers, creates structured RFQs with specific delivery windows, and tracks lead stages (Identified -> Contacted -> Qualified).
7. **Admin Trust Center**: Review ingestion runs, audit logs, deduplication queue, and source provenance.

## Screens and Layout
- **Global Header**: Logo, Arm quick-nav (Discover, Events, Businesses, Products/Land, AI Matchmaking, Trade Desk, Workspace, Admin), live search bar, user profile switcher (Buyer, Exporter, Admin).
- **Discover Dashboard**: Executive overview, market signals, top upcoming trade expos, spotlighted verified suppliers, and interactive quick-sourcing launcher.
- **Events Directory (ARM D)**: Filterable list/cards by country, dates, format (In-person, Hybrid), category, official registration links, and bookmarking.
- **Business Directory (ARM A & B)**: Multi-attribute filters (Manufacturer, Producer, Input Supplier, Land Owner), verified badges (Identity, Registration, Certified, Trade History), and detail modals.
- **AI Matchmaking Studio**: Interactive prompt bar with preset trade scenarios, real-time Gemini extraction, compatibility scoring matrix, evidence links, missing data callouts, and next-action recommendations.
- **Trade Desk & Readiness (ARM C)**: Route compliance analyzer, commodity regulation guides, and Incoterms matrix.
- **Workspace**: Kanban/list of saved businesses, active sourcing RFQs, contact logs, and private notes.
- **Admin Trust & Ingestion Portal**: Source management, ingestion health, duplicate detection queue, and provenance inspector.

## Look and Feel
- **Theme**: Premium institutional dark theme (`bg-slate-950`, cards `bg-slate-900/90` with `border-slate-800`).
- **Accents**: Agricultural emerald (`emerald-500`), leaf green (`green-400`), caution amber (`amber-400`), verification cyan (`cyan-400`).
- **Typography**: Clean modern sans-serif with high readability, tabular figures for quantities/metrics, and clear badge tags.
- **Interactions**: Smooth animated tabs and transitions via `motion`, interactive tooltips for evidence provenance.

## Features and Behavior

### 1. The Four Agricultural Trade Arms
- **ARM A (Manufacturers & Suppliers)**: Machinery (tractors, harvesters, sorting), irrigation (drip, pivot), seeds/plants, fertilizers, greenhouse tech, cold chain.
- **ARM B (Producers & Land)**: Growers, farming cooperatives, nurseries, contract farming opportunities, agricultural land lease listings with soil/water indicators.
- **ARM C (Exporters, Importers, Trade Desk)**: B2B trade participants, commodity specifications, packaging, Incoterms (CIF, FOB), delivery periods.
- **ARM D (Expos & Events)**: Verified trade fairs, conferences, dates, organizers, and verified official URLs.

### 2. Multi-Dimensional Trust System
- Badges: `Identity Verified`, `Business Registry Confirmed`, `Certification Verified` (GlobalGAP, NAK, SASA, ISO), `Trade History Tracked`.
- Evidence classification tags: `Officially Sourced`, `Independently Corroborated`, `Source-Reported`, `Inferred`, `Unverified`.

### 3. AI Matchmaking Engine
- Structured parsing: Extracts commodity, variety, quantity, units, origin, destination, timing.
- Deterministic filtering + Gemini 3.8 Flash qualitative evaluation.
- Explainable output: Match percentage, rationale, satisfied requirements, missing facts, risk alerts, and suggested diligence questions.

### 4. Trade-Readiness Assistant
- Input: Origin, Destination, Commodity, Specification, Intended Use (planting vs consumption).
- Output: Competent regulatory authorities, document requirements (Phytosanitary Certificate, Bill of Lading, Certificate of Origin, Import Permit), customs watchouts.

## States and Boundaries
- **Empty States**: Friendly prompts with quick example presets for AI matchmaking and directory filters.
- **Error States**: Graceful fallback if Gemini API is unavailable, utilizing local deterministic matching with clear notice.
- **Persistence**: Workspace leads, RFQs, and custom queries persist in browser storage (`localStorage`) and in-memory mock store.

## Product Decisions
- **Deterministic Rules Before LLM**: Hard requirements (e.g. legally required certification or banned origin) reject candidates immediately; LLMs are used for semantic matching, capability evaluation, and explanation generation.
- **No Hallucinated Contacts/Deals**: Every listing specifies its provenance source. If unknown, explicitly marked as `Unknown`.

## What We're Building
A complete, responsive SaaS web application featuring all 8 primary navigation views, functional AI matchmaking via server API route, interactive trade-readiness checks, persistent workspace, and admin data quality panel.
