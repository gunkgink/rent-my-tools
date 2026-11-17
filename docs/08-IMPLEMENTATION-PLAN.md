# End-to-end execution plan

This sequence covers design, implementation, verification and handoff. Local work can proceed without external publication. Estimates are relative effort, not a promised schedule; no due date has been supplied. Total indicative effort12–18 focused working days for one student with API/database access, adjusted after the first integration spike. Each phase closes with evidence; do not advance by merely checking boxes.

## Phase0: inspect and resolve integration foundations (1 day)

- T00 Inspect Git status, README, AGENTS, plan, existing files and remote; preserve user work. Confirm current PDF inventory/hash and backend commit against document02.
- T01 Obtain the project submission/presentation announcement or rubric from user if not already local; do not block coding on it. Confirm preferred language/currency, Figma destination and actual team roles when available. Defaults in decision register allow design work now.
- T02 Inspect supplied backend (separate from frontend repository). Record commit, required runtime/env and endpoints. Configure disposable local MongoDB or a user-provided development URI; never production data. Keep credentials untracked. Seed2 members and1 admin through supported API plus8 example equipment records, record resulting IDs in local test setup, not hard-coded production source.
- T03 Version spike: query official package metadata, choose compatible Next16/React/NextAuth4 pair and Node runtime. Minimal credentials login, server-only token access, `/auth/me`, authenticated Server Action, logout and production build. Save exact versions/results. If compatibility fails, resolve before polishing pages.
- T04 Record backend requests directly for required operations and rule boundaries. `/health` success alone is insufficient. Capture sanitized contract fixtures and statuses; no bearer tokens in evidence.

Gate0: either real database-backed API works or blocker clearly recorded. Mock-based UI work may continue, but real integration remains incomplete. Credentials helper and auth pattern must be proven before implementing private screens.

## Phase1: design foundations and Figma structure (1–2 days)

- T10 Build sitemap and R01–R20 frame checklist from documents01/04; keep Figma names consistent with S IDs.
- T11 Follow document05 to create foundations, components, wireframes and member/admin flows. Use document03 tokens; source licensed assets and write `docs/ASSET-LICENSES.md`.
- T12 Design catalog/detail/request first, then admin working screens; check mobile early. Review all failure states and rule copy. Prototype guest-to-member and admin management.
- T13 Critique selected design against brief; record rejected generic treatments and any deliberate changes in `docs/12-EXECUTION-LOG.md`. If native Figma access unavailable, keep Figma task pending and produce precise local frame specifications/exports without claiming native completion.

Gate1: wireframes, design tokens, component states, and requirement-linked prototype specification are reviewable. Native Figma completion is separately tracked.

## Phase2: scaffold and shared UI (1–2 days)

- T20 Scaffold Next app inside current repo root without overwriting docs/AGENTS/README/.git. If generator requires an empty directory, generate in a verified temporary sibling and copy only app scaffold files deliberately; do not replace repository or move hidden Git directories.
- T21 Configure TypeScript strict, ESLint, npm scripts, Jest/RTL and isolated Cypress TS project; include lockfile, `.env.example`, safe `.gitignore`. Keep authored tests in Git; ignore `.next`, node_modules, local env, coverage, Cypress artifacts and generated screenshots where appropriate. Curated final evidence may be committed explicitly.
- T22 Implement tokens/fonts, AppHeader/footer, Button/Field/Notice/Dialog/skeleton/empty state, container and responsive layout. Build a development-only component gallery or Storybook only if useful; avoid another framework for a small project.
- T23 Implement typed API/error adapter and validation/date functions. Unit-test boundary rules while establishing adapter shapes. Add stub API process/test fixtures where SSR needs predictable network data.

Gate2: reproducible `npm ci`, lint/typecheck/unit checks and production build; usable shared components at390/768/1440. No fake live data success.

## Phase3: public equipment (1 day)

- T30 S01 home/catalog server reads and client URL filters/sort; S04 dynamic detail.
- T31 Real category/image fallback, stock0, rate0, long text, loading/empty/error/not-found, no date availability claims.
- T32 Compare UI to Figma, link guest request action to safe login callback. Record public browse evidence and errors with controlled fixtures.

Gate3: guest sees actual API equipment and can reach selected detail with coherent mobile layout.

## Phase4: authentication and authorization (1–2 days)

- T40 Complete S02/S03 including all registration fields and role options. Preserve safe callbacks through registration/login.
- T41 Typed JWT/session lifecycle, server-only backend token helper from successful spike, `/auth/me` profile S09, protected layout AND action checks, expiry/logout and draft clearing.
- T42 Test wrong role/deep link/expired credential/cross-member access directly against real API and frontend actions. No reliance on hidden buttons or client role storage. Do not log secrets in test diagnostics.

Gate4: member/admin login survives refresh and enforces permissions; logout leaves no accessible private data on back/reload. Account data comes from `/auth/me`.

## Phase5: member request lifecycle (2 days)

- T50 Implement S05 form + draft slice/persistence + summary. Dates strict UTC; quantity bounds; same-day and7-day behavior correct. Estimate caveat visible, no extra payload fields.
- T51 Submit member request; saved detail S07, own list S06, error retention, duplicate-click prevention, stock unchanged. Clear draft only after confirmed success.
- T52 Edit S08 including equipment switching and past-start/removed-equipment caveats; delete confirmation; handle stale stock and unknown mutation outcome without blind retry.
- T53 Add rule/unit/component/E2E tests; return to logged-out selected request, reload draft, switch accounts, prove no leakage.

Gate5: real create/view/edit/delete persists through reload, each boundary passes, other member's records remain inaccessible.

## Phase6: admin equipment and requests (1–2 days)

- T60 S10/S11 add/edit/remove equipment; unique-name errors retain values; zero quantity/rate valid; removed item disappears publicly without deleting request history.
- T61 S12 all requests, requester detail, admin edit/delete any user; owner immutable. Do not add admin create request or approval/status controls.
- T62 Responsive record views for admin tables; explicit confirmation consequences and safe return navigation. Test member cannot invoke admin mutations directly.

Gate6: all R01–R20 have working paths and recorded real-API evidence; admin operations refresh public/member surfaces correctly.

## Phase7: quality, visual refinement and usability (1–2 days)

- T70 Execute document09 matrix. Address critical failures before decorative work. Run keyboard-only core flows, 320/390/768/1024/1440 layouts,200% zoom, reduced motion, contrast, screen-reader spot checks.
- T71 Review implementation screenshots vs Figma at same widths; fix image crops, whitespace, form hierarchy, mobile sticky overlap and long data. Save before/after only when useful.
- T72 Ask3–5 classmates for short task-based usability sessions if feasible (find item, request2 units, edit, admin stock); report observed results honestly. If not conducted label as planned, not passed. Fix observed blockers.
- T73 Run clean `npm ci`, lint, tsc, Jest, build and Cypress real integration; record commands/environment/results. Investigate hydration warnings and auth callback issues. Review API call volume against rate limit.

Gate7: release checklist complete or precise failures/blockers explicitly documented. No screenshots/counts masquerading as end-to-end tests.

## Phase8: deployment preparation and authorized release (0.5–1 day)

- T80 Write deployment runbook: chosen Node, frontend root repo, build `npm ci && npm run build`, start command/runtime, server-only env, backend origin, production NEXTAUTH_URL, unique NEXTAUTH_SECRET, backend FRONTEND_URL, database setup, HTTPS and CORS. Never paste actual secrets.
- T81 Verify actual hosting support for supplied Express server before following a historical Vercel example. Frontend Vercel is a course-aligned candidate; backend may require adapter/config or another supported Node host. Record reproducible configuration rather than promise one-click deployment.
- T82 Prepare preview locally and list exact external account/config inputs needed. When user authorizes deployment, deploy backend/frontend, set origins/secrets in provider UI, test database-backed equipment and authenticated request lifecycle remotely. A200 health page does not close integration.
- T83 Rollback plan: retain last known-good commit/deployment; revert frontend deployment if login/API breaks; avoid schema changes. Database backups before any seed/cleanup that affects shared data. Smoke-test CORS, secure cookies, logout, rate limits and mobile over HTTPS.

Gate8: deployment-tested only when observed remotely; otherwise mark prepared/not deployed. No push/publish implied by this design task.

## Phase9: Figma, presentation and submission (1–2 days)

- T90 Update Figma to final UI; complete prototype flows/export assets; record version/share link without widening sharing unasked.
- T91 Build deck using document10, screenshots from actual app, requirement/test evidence, architecture, limits and course mapping. Rehearse live demo plus backup recording and offline screenshots.
- T92 Replace initial README with setup/use/test/env/deployment/feature guide and links to docs, prototype/deck when real. Capture known issues, missing inputs, tested versions, image/font licenses.
- T93 Check actual rubric; assemble final links/artifacts/roster/contribution record if required; remove placeholders and secrets. Verify repository status and delivery contents. Commit/push only under user instructions; never claim submission before actual submission.

Final gate: implementation, design source, tests, real integration evidence, editable Figma, presentation and required submission items have independent status. Any unfinished external artifact is named plainly.

## Work allocation

Use `agents/delivery-lead.md` as coordinator brief, `agents/frontend-builder.md` for implementation, `agents/design-and-figma.md` for design, `agents/quality-reviewer.md` for verification and `agents/presentation-producer.md` for final communication. These files work for one agent sequentially or a human team; they do not require parallel execution. If delegation is chosen with user authorization, assign disjoint file ownership and synchronize at phase gates. A designer changing tokens must notify the builder; a reviewer changing the contract must verify source first.
