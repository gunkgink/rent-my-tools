# Rent My Tools

Equipment Rental System · Course Project 2

Equipment for your next project.

Speaker notes: Add actual team names and official presentation slot after the user provides them. This is an editable presentation source, not a submitted or published deck.

---

# The equipment library

Find a camera, projector, computer or sports item for a short project.

Browse equipment → choose dates and quantity → send a rental request.

Speaker notes: Student/coordinator roles are design hypotheses, not interview findings. Demonstrate the real catalog, not a fabricated usage statistic.

---

# Roles and responsibilities

| Everyone | Member | Admin |
|---|---|---|
| Browse equipment and rates | Create requests | Add/edit/remove equipment |
| View available quantity | Manage own requests | Manage everyone's requests |
| Register and log in | View own account | View requester details |

Speaker notes: Both roles are available at course registration. Admin cannot use the member-only create-request endpoint.

---

# Design direction

Bright equipment-library imagery, clear unit rates and prominent form summaries.

Cobalt actions · pale blue image fields · yellow library marker.

Barlow Semi Condensed headings and IBM Plex Sans body text.

Speaker notes: Category art is original SVG, not product photography. Explain why the available quantity and price unit remain visible. Show desktop and mobile catalog.

---

# Member flow

Browse → item details → login → request form → saved detail.

View → edit → save changes, or confirm deletion.

Speaker notes: Use the actual application. Request creation does not reserve or deduct stock. Estimate is illustrative and no payment is collected.

---

# Rental rules

- Whole quantity from1 to3, within available stock.
- Start date today or later in UTC.
- Return on or after start; same-day allowed.
- Return minus start at most7 days.

Speaker notes: December1 to8 is allowed; December1 to9 is rejected. UI and supplied API both validate. UTC can differ from Bangkok's local date near midnight.

---

# Administrative work

Maintain equipment name, category, description, quantity and daily rate.

View, edit and delete requests across members.

Speaker notes: Removal hides active equipment but preserves request history. Request ownership cannot be reassigned. No approval or return-processing workflow is supplied.

---

# Architecture

Browser → Next.js server components/actions → supplied Express API → MongoDB.

NextAuth Credentials manages login. Backend bearer token stays server-side.

Speaker notes: Role/ownership checks remain in API. Public session exposes profile data, not backend bearer token. Frontend never writes MongoDB directly.

---

# Course concepts in the application

App Router and typed props · controlled forms and hooks · server fetching and actions · NextAuth · Redux draft persistence · Jest/RTL and Cypress.

Speaker notes: Cite materials W07,W09,W10,W11–12,W13–14 and concrete source files. Explain deliberate adaptations from older examples, including explicit no-store and no token logging.

---

# Verification

Pure-function rule tests, component confirmation test, browser CRUD flows and direct real-API permission tests.

Speaker notes: Read current results from docs/evidence and execution log before presenting. Never quote counts from an earlier run or call a planned test passed. The local API uses a disposable real MongoDB database.

---

# Demonstration

1. Find camera equipment and inspect stock/rate.
2. Member sends a valid dated request, edits and deletes it.
3. Admin creates/edits/removes equipment.
4. Show cross-member access denial and unchanged stock.

Speaker notes: Follow docs10 reset plan. Synthetic credentials are private local runtime data; do not project passwords or tokens. Keep an offline recording/screenshot backup.

---

# Delivery and limits

Local application and reproducible setup are available in the repository.

Native Figma, final team details, official rubric reconciliation and remote deployment require their respective inputs/actions.

Speaker notes: Add real repository/prototype/deployment links only after verifying access. Currency and same-day estimate are explicitly UI assumptions. No claim of production readiness or external submission.
