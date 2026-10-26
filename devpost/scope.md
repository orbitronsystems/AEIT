---
doc: scope
status: approved
---

# AEIT — Global Agricultural Trade Intelligence SaaS

Global agricultural trade intelligence, events discovery, and explainable B2B business matchmaking platform connecting manufacturers, producers, and buyers across international borders.

## The Unique Kernel
Multi-dimensional trust modeling with explainable AI matchmaking: every trade recommendation explicitly maps requirement-by-requirement compatibility, reveals data provenance and freshness, separates verified facts from source-reported claims, and flags missing phytosanitary/customs documentation before any inquiry is made.

## Who It's For
Agricultural exporters, importers, procurement managers, farm equipment manufacturers, and trade mission delegates (e.g., an Egyptian commodity buyer seeking 27 metric tonnes of certified seed potatoes from Scotland or the Netherlands, or a Kenyan co-op seeking solar drip irrigation equipment).

## The Core Loop
1. User enters sourcing needs or discovers agribusinesses / international expos across the 4 Trade Arms.
2. AI Matchmaking & Trade Desk evaluates compatible partners against strict trade readiness and verification criteria.
3. User inspects explainable evidence, risk flags, and missing data.
4. User saves qualified leads to their Workspace, drafts structured RFQs, or prepares compliance checklists.

## Inspiration & Identity
- High-trust institutional B2B interface (Bloomberg / PitchBook meets Global Food & Ag Trade).
- Palette: Deep slate (`slate-950`), emerald and forest green accents (`emerald-500`, `emerald-400`), amber caution indicators, clear verification badge states.
- Tone: Serious, authoritative, commercially rigorous, action-oriented.

## Why This Matters to the Learner
Fragmented information, fraud, and opaque directories cost legitimate agricultural businesses billions in lost trade and failed shipments. Solving this through transparent provenance and explainable matching unlocks cross-border agricultural prosperity.

## What "Working" Looks Like
A user can search businesses across 4 Arms, filter verified events worldwide, run a live AI sourcing query (e.g., "Find seed potato suppliers in Netherlands or Scotland for 27 MT to Egypt"), receive ranked candidate matches with explainable compatibility scores and risk flags, test trade-readiness for a route, and manage leads in their personal workspace.

## The POC Boundary
- Included:
  - ARM A: Equipment, seed, input suppliers directory.
  - ARM B: Producers & land opportunities directory.
  - ARM C: Exporters, importers & B2B trade desk.
  - ARM D: Global agricultural expos and conferences directory.
  - AI Matchmaking engine (server-side Gemini 3.8 Flash with structured extraction and explainable reasoning).
  - Trade-Readiness assistant with regulatory checklists.
  - Business Workspace (RFQ tracker, saved leads, notes).
  - Admin & Trust Center (data ingestion runs, review queue, provenance inspector).
- Cut:
  - Live escrow/payment settlements (deferred to roadmap Phase 11).
  - Third-party government API live crawling (handled via simulated deterministic ingestion pipeline).
