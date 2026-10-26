---
doc: spec
status: approved
---

# AEIT — Technical Specification

## How This Works, In Plain Language
AEIT is a full-stack Next.js 15 application built with TypeScript, Tailwind CSS, and Google GenAI SDK (`@google/genai`).
When a user searches or views listings, the frontend displays structured agricultural datasets across the Four Arms (Suppliers, Producers, Trade, Events) with provenance tags.
When the user submits an AI Sourcing query, the browser dispatches a POST request to `/api/matchmaking`. The server calls Gemini 3.8 Flash (`ai.models.generateContent`) with system instructions enforcing the AEIT Master Guidelines: strict structured JSON extraction, requirement-by-requirement scoring, risk analysis, and recommended questions. The frontend renders this in an explainable decision card with interactive next steps (save to workspace, export RFQ).
Similarly, the `/api/trade-readiness` endpoint synthesizes route-specific compliance checklists.
A central state store (`useLocalStorage` + React context) coordinates saved businesses, RFQs, and leads across the workspace and admin views.

## The Core Journey Through the System
1. User lands on Discover page (`/app/page.tsx`), browsing curated metrics and four trade arm cards.
2. User enters an AI query in the Matchmaking Studio or clicks the "Seed Potatoes Netherlands -> Egypt" sample.
3. Client sends payload to `/api/matchmaking`.
4. API route invokes Gemini 3.8 Flash with the candidate database and prompt schema.
5. If Gemini succeeds, returns structured JSON; if network/API limits occur, deterministic fallback provides structured result with warning tag.
6. User reviews ranked candidates, expands requirement breakdown, and clicks "Save to Workspace".
7. Item is stored in the user's active workspace session for immediate pipeline tracking.

## Stack
- Framework: Next.js 15 (App Router, standalone output)
- Language: TypeScript 5.9
- Styling: Tailwind CSS v4, Lucide React icons
- Motion/Transitions: `motion` (motion/react)
- AI SDK: `@google/genai` (2.4.0) with server-side `gemini-3.8-flash`
- Telemetry: `httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }`

## Where It Runs and How Someone Tries It
- Local dev server: `npm run dev` on port 3000.
- AI Studio Dev Cloud Run environment.
- No client-side API keys exposed; server reads `process.env.GEMINI_API_KEY`.

## Look and Feel
- Slate-950 dark background, Slate-900 surface cards, Emerald-500 primary accents, Amber-400 warning indicators, Cyan-400 verification badges.
- Strict anti-AI-slop design: clean typography, purposeful badges, real agricultural terminology, no generic chatbot bubbles.

## Components
- `Header`: Navigation across 8 modules, role selector, quick search.
- `DiscoverView`: High-level metrics, market signals, Four Arms showcase.
- `EventsView`: Filterable global expo catalog with status, dates, and official URLs.
- `BusinessesView`: Directory covering Arm A & Arm B with verification badges and contact modals.
- `MatchmakingView`: Sourcing engine, preset trade prompts, explainable match results.
- `TradeDeskView`: Route compliance analyzer and Incoterms documentation checklist.
- `WorkspaceView`: Saved suppliers, active RFQs, status pipeline.
- `AdminView`: Ingestion health, source provenance, deduplication queue.

## Data Model & Schemas
Located in `/lib/types.ts`:
- `AgriBusiness`: ID, name, arm, country, city, website, verifiedStatus (identity, registry, certs, tradeHistory), products, certifications, capacity, sourceProvenance.
- `AgriEvent`: ID, name, category, organizer, country, city, venue, startDate, endDate, format, officialUrl, registrationUrl, status, confidence, lastChecked.
- `SourcingRequest`: ID, commodity, variety, quantity, unit, origin, destination, deliveryWindow, incoterms, specifications.
- `MatchCandidate`: Business reference, matchScore, rationale, satisfiedRequirements, missingInformation, riskFlags, suggestedQuestions, nextAction.
- `IngestionRecord`: Source ID, sourceName, sourceType, lastRun, recordsDiscovered, recordsAccepted, duplicateCount, status.

## File Structure
```
app/
  api/
    matchmaking/route.ts      # Server-side Gemini AI matching
    trade-readiness/route.ts  # Server-side Gemini trade compliance
    ingestion/route.ts        # Ingestion pipeline simulator
  globals.css
  layout.tsx
  page.tsx                    # Main portal orchestrator
components/
  AdminView.tsx
  BusinessesView.tsx
  DiscoverView.tsx
  EventsView.tsx
  Header.tsx
  MatchmakingView.tsx
  TradeDeskView.tsx
  WorkspaceView.tsx
lib/
  data/
    businesses.ts             # Source-grounded seed businesses
    events.ts                 # Source-grounded global ag expos
    ingestion.ts              # Ingestion sources & runs
  gemini.ts                   # Server-side GoogleGenAI client singleton
  types.ts                    # TypeScript types
  utils.ts
```

## Important Failure Modes
1. **Gemini API Key missing or quota exceeded**: API route catches error and immediately serves deterministic, rule-based matching with fallback notification badge.
2. **Missing fields in sourcing request**: Engine flags missing parameters (e.g. grade, delivery window) rather than inventing answers.
3. **Invalid route or unconfirmed event**: Labeled clearly as `Unconfirmed` or `Pending Due Diligence`.
