# Rent My Tools: delivery handoff

Prepared 16 November 2026, Asia/Bangkok. Product: course Project 2, Equipment Rental System. This package specifies the frontend and its Figma, test, presentation, and delivery artifacts. Execution has since added the local application, automated tests, development launcher, Figma import inputs and Markdown/HTML presentation sources. Read docs/12-EXECUTION-LOG.md for actual verification and remaining work; the native Figma starter file is now created; no remote deployment has occurred.

## Next-agent prompt

> Work inside `D:\university\subject\SwDev2\project\rent-my-tools`. Read `AGENTS.md` and `docs/00-START-HERE.md`, follow the linked design and implementation documents, and use `.agents/skills/rent-my-tools-delivery/SKILL.md`. Build Rent My Tools end to end against the supplied Project 2 backend. Preserve course requirements, the specified visual system, and existing Git changes. Execute phases in order; keep the execution log current. Validate real member/admin behavior and boundary cases, not just mock screens. Prepare the Figma and presentation deliverables from their specifications. If an external account, database credential, submission rubric, or Figma access is needed, request that specific missing input while continuing independent local work. Do not claim unperformed checks or publish externally without authorization.

## Reading order and document map

| Order | Document | Purpose |
|---|---|---|
| 1 | [01-REQUIREMENTS.md](01-REQUIREMENTS.md) | Traceable functional requirements, limits, scope |
| 2 | [02-SOURCES-AND-COURSE-MAP.md](02-SOURCES-AND-COURSE-MAP.md) | Actual PDFs, page references, backend evidence |
| 3 | [03-DESIGN-SYSTEM.md](03-DESIGN-SYSTEM.md) | Design exploration, critique, selected tokens and assets |
| 4 | [04-SCREENS-AND-FLOWS.md](04-SCREENS-AND-FLOWS.md) | Routes, screen specifications, states, microcopy |
| 5 | [05-FIGMA-HANDOFF.md](05-FIGMA-HANDOFF.md) | Figma file construction and prototype scenarios |
| 6 | [06-API-CONTRACT.md](06-API-CONTRACT.md) | Verified API shapes and edge cases |
| 7 | [07-TECHNICAL-ARCHITECTURE.md](07-TECHNICAL-ARCHITECTURE.md) | Stack, auth, boundaries, state, directory design |
| 8 | [08-IMPLEMENTATION-PLAN.md](08-IMPLEMENTATION-PLAN.md) | Tasks, dependencies, acceptance gates, deployment |
| 9 | [09-QUALITY-AND-ACCEPTANCE.md](09-QUALITY-AND-ACCEPTANCE.md) | Test matrix, visual review, release criteria |
| 10 | [10-PRESENTATION-AND-SUBMISSION.md](10-PRESENTATION-AND-SUBMISSION.md) | Deck storyboard, demo, evidence, hand-in checklist |
| 11 | [11-DECISIONS-AND-RISKS.md](11-DECISIONS-AND-RISKS.md) | Assumptions and unresolved inputs |
| 12 | [12-EXECUTION-LOG.md](12-EXECUTION-LOG.md) | Honest progress and verification record |
| Reference | [source-inventory.md](source-inventory.md) | PDF hashes, page counts and extracted page index |

## Paths and ownership

- Git repository: this `rent-my-tools` folder; existing origin `https://github.com/gunkgink/rent-my-tools.git`. Do not initialize a replacement repository or change origin.
- Course PDFs: `../material/` (14 PDFs present during this review, Classes 01–14); topic: `../6901_Project_Topics-957520-17911698720803.pdf`, Project 2 on page 3 and setup on page 1.
- Read-only backend inspection checkout: `../tmp/backend-reference/`, source commit `be18df9967be7e0a742b5a5ae25f07966dc4e1d4`. This checkout is temporary; official source links in document 02 are the durable reference. Never rely on its bundled development secret.
- Future application source, test configuration, assets, documentation, Figma exports, presentation source and evidence belong inside this Git repository. Do not copy all course PDFs or temporary backend clones into Git by default.
- Keep `docs/` as the source of truth. Agent role briefs route to it; they should not maintain divergent specifications.

## What is required versus proposed

Topic requirements are labeled R01–R20. Design and technical choices are implementation decisions. Figma/deck specifications are requested supporting deliverables; the official criteria were subsequently supplied. Document13 records the actual grading weights, deadline, seven-minute journey and required attachments, and supersedes earlier assumptions.

English UI, Thai-friendly typography, THB display, campus equipment-library positioning, no checkout/payment, no extra business workflows. Currency and price estimates are explicit assumptions; see decision register. The name covers cameras, notebooks, projectors and sports equipment, not only construction tools.
