---
name: rent-my-tools-delivery
description: Implement or review this repository's course Project 2 Equipment Rental frontend, preserving its documented design, API semantics, Figma handoff and requirement evidence. Use for Rent My Tools work, not unrelated frontend projects.
---

# Rent My Tools delivery

Repository root is three levels above this skill folder. Read `../../../AGENTS.md` and `../../../docs/00-START-HERE.md` first. Requirements and API semantics are canonical in docs01/06, visual decisions in docs03/04, phase gates in docs08. Do not copy this product's constraints into unrelated projects.

## Route by work

- Design/Figma: read docs03/04/05 and use frontend-design. Retain the chosen equipment-library concept, component states and responsive specifications; critique against real equipment content before implementation.
- Build/integrate: read docs01/06/07/08. Prove package/auth compatibility and server-only bearer access before private screens. Next frontend calls supplied API; never bypass rules with direct MongoDB access.
- Verify: read docs09. Test member ownership/admin scope with real API, UTC date-only limits,stock and duration boundaries. Label stubbed versus integrated results.
- Present/submit: read docs10/11 and actual execution log. Match implemented scope and available evidence; reconcile official rubric before hand-in.

## Non-obvious invariants

Requests do not reserve/deduct stock; no approval/payment/return workflow. Same-day allowed; maximum7 is return-start in UTC, not inclusive calendar count. Maximum3 integer units and <=current quantity per request; overlap allowed. Admin manages any request but POST is member-only. Both roles available at course registration. Equipment deletion soft; rental deletion permanent in API. Update reapplies past-start/stock rules even for historical requests. Ownership never changes on edit.

Keep credentials out of public session,Redux/storage/logs/screenshots. Only nonsecret create draft persists; clear success/logout/account switch and revalidate restore. Current-rate estimate is a labeled UI assumption, not saved billing. Images need local mapping/fallback because API has no media field.

## Handoff behavior

Update docs12 with changed files, observed checks and precise blockers. Use named R/S/test IDs. Finish authorized local work while waiting for external access; do not claim native Figma/deck/deployment completion without the artifact. Agent briefs in `../../../agents/` describe optional working roles, not automatically running agents. Preserve existing Git state/remote and user edits. Stop when the requested phase is actually complete or a concrete dependency prevents progress; report remaining work plainly.
