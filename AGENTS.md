# Rent My Tools: execution instructions

This repository implements course Project 2, Equipment Rental System. Application source and local test/runtime scripts now exist; consult docs/12-EXECUTION-LOG.md and docs/evidence for current observed results. Native Figma and external deployment are independently tracked.

## Start here

1. Read `docs/00-START-HERE.md`, then the ordered reading list there.
2. Read `.agents/skills/rent-my-tools-delivery/SKILL.md`. Use `frontend-design` if available; its project-specific conclusions are already in `docs/03-DESIGN-SYSTEM.md`.
3. Inspect the existing tree and Git status before edits. Work in this repository, not the parent workspace. Preserve the existing Git remote and user changes.
4. Execute the phases in `docs/08-IMPLEMENTATION-PLAN.md`; record evidence and remaining work in `docs/12-EXECUTION-LOG.md`.

## Product invariants

- Public equipment browse/detail; member requests; admin equipment and all-user request management.
- Preserve registration's explicit member/admin role field for this course. This is a supplied educational API behavior, not a production access policy.
- A request is not a reservation, payment, approval, collection, or return transaction. Do not invent those features or statuses.
- Quantity is an integer 1..min(3, current stock). Duration uses UTC calendar dates, return minus start <=7; same-day and exactly seven-day differences are allowed.
- Requests do not reduce stock. The backend independently validates each request; overlap is allowed.
- Backend source and topic PDF outrank assumptions; document discrepancies instead of silently changing the supplied backend.
- Admin may edit/delete any request but may not create one through the member-only endpoint.

## Implementation boundaries

Next.js 16 App Router + TypeScript; follow course-aligned architecture in `docs/07-TECHNICAL-ARCHITECTURE.md`. Verify actual package availability and peer compatibility before pinning. Never use force installation to conceal incompatibility. Keep session secrets and bearer tokens server-side; never persist them in Redux/localStorage or expose them in screenshots/logs. Backend remains the data authority.

Server Actions and route handlers are callable endpoints: validate input and authentication/authorization inside each one. Hiding buttons does not enforce permissions. Use explicit no-store for user/private and mutable stock data. Do not connect the frontend directly to MongoDB.

Do not overwrite this instruction file when scaffolding. No paid services, external publication, push, production database changes, or fabricated completion evidence are implied by the local implementation request. Prepare deployment instructions; publish when the user requests it.

## Completion

Use `docs/09-QUALITY-AND-ACCEPTANCE.md`. A polished mock-only app is not complete. Clearly separate fixture-tested, real-API-tested, deployment-tested, and pending evidence. Keep Figma specifications, implemented UI, and presentation claims aligned. Agent profiles in `agents/` are role briefs, not running agents or installed agent registrations.
