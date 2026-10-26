---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Project Foundation & Data Models**
  Becomes usable: Clean TypeScript data definitions for the 4 Arms, Multi-dimensional Trust, Sourcing Requests, and Events.
  Why now: Provides type safety and predictable structure for all downstream UI and APIs.
  PRD ref: `prd.md > Features and Behavior`
  Spec ref: `spec.md > Data Model & Schemas`
  Build: Create `lib/types.ts` with complete schemas.
  Verify (mechanical): TypeScript compilation check.
  Commit: `Add core agricultural domain types and schemas`

- [x] **2. Source-Grounded Data Store**
  Becomes usable: Rich, realistic, verified seed records for Arm A (Suppliers), Arm B (Producers/Land), Arm C (Traders), and Arm D (Expos like Agritechnica, Fruit Logistica, Sahara Expo).
  Why now: Grounding the AI engine and UI in traceable, high-fidelity business data is mandatory per AEIT principles.
  PRD ref: `prd.md > Features and Behavior > 1. The Four Agricultural Trade Arms`
  Spec ref: `spec.md > File Structure`
  Build: Create `lib/data/businesses.ts`, `lib/data/events.ts`, and `lib/data/ingestion.ts`.
  Verify (mechanical): Validate record count, unique IDs, and field completeness.
  Commit: `Add verified agricultural datasets across the 4 Trade Arms`

- [x] **3. Server-Side Gemini AI Integration**
  Becomes usable: Endpoints `/api/matchmaking` and `/api/trade-readiness` running `gemini-3.8-flash` with structured schemas and deterministic fallback.
  Why now: Provides genuine explainable AI intelligence while adhering to zero-token-waste and no-client-secret rules.
  PRD ref: `prd.md > Features and Behavior > 3. AI Matchmaking Engine`
  Spec ref: `spec.md > External Services and Dependencies`
  Build: Create `lib/gemini.ts`, `app/api/matchmaking/route.ts`, and `app/api/trade-readiness/route.ts`.
  Verify (mechanical): POST test call with sample sourcing query.
  Commit: `Implement server-side Gemini 3.8 Flash matching and trade readiness APIs`

- [x] **4. Full UI Components & Modular Navigation**
  Becomes usable: Interactive portal with Discover, Events (Arm D), Businesses (Arm A/B), Matchmaking Studio, Trade Desk (Arm C), Workspace, and Admin Ingestion views.
  Why now: Connects users with actionable intelligence, saved leads, and RFQ creation.
  PRD ref: `prd.md > Screens and Layout`
  Spec ref: `spec.md > Components`
  Build: Create all view components and assemble in `app/page.tsx`.
  Verify (mechanical): Applet compiles with `compile_applet`.
  Commit: `Build complete AEIT SaaS dashboard and views`

- [x] **5. Workspace Persistence & End-to-End Workflow Verification**
  Becomes usable: Users can save businesses, draft RFQs, inspect source provenance, and trigger ingestion runs.
  Why now: Fulfills Definition of Done.
  PRD ref: `prd.md > States and Boundaries`
  Spec ref: `spec.md > How This Works, In Plain Language`
  Verify (mechanical): Full compilation and smoke check.
  Commit: `Finalize workspace persistence and administrative controls`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Data models and source-grounded datasets established
- [x] Final kick-the-tires exploration and feedback completed — Full end-to-end matchmaking and workspace verified

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route and architectural patterns documented
- [x] `devpost/app-map.html` generated from finished code, checked, and shown
