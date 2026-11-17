# Presentation, demo and submission plan

Official instructions are now supplied and reviewed. See docs/13-OFFICIAL-RUBRIC-RECHECK.md: presentation plus ordered live demo must fit7 minutes, followed by3 minutes of questions; submission deadline is18 November2026 at23:00 Bangkok. The twelve-slide storyboard below is an appendix/content bank, not a12-minute talk. Use docs/presentation/7-MINUTE-JOURNEY.md for the assessed run order. Build an editable presentation when requested/access permits, not just screenshots. Theme uses design tokens and equipment imagery from document03;16:9,32–40pt headings,22–26pt body, generous whitespace, no screenshot text too small to read.

## Storyboard

| Slide | Main claim | Visual/evidence | Speaker content |
|---|---|---|---|
| 1 | Rent My Tools: equipment for short projects | Product name, one equipment image, actual team names | Name course/topic and scope in20sec |
| 2 | Students need a clear path from discovery to a request | Three-step user journey; personas labeled assumptions | Explain target task, not invented survey statistics |
| 3 | Two roles,20 mapped requirements | Compact public/member/admin responsibility table | Explain member ownership and admin scope |
| 4 | A practical equipment-library design | Palette/type, catalog/detail/mobile frames | Why clear imagery, rate units, quantity and simple forms support task |
| 5 | The member flow stays understandable | Browse -> details -> dates/quantity -> saved request | Show real request semantics, no payments or stock reservation |
| 6 | Rental rules are visible and enforced |3-unit cap, UTC date example,7-day boundary | Same-day allowed;1Dec->8Dec allowed; distinguish UI and server validation |
| 7 | Admins maintain inventory and all requests | Equipment table + request detail | Add/edit/remove, all-user edit/delete, soft-delete history |
| 8 | Next frontend uses the supplied API | Browser -> Next server/auth/actions -> Express -> Mongo diagram | Explain bearer JWT, private server boundary, no direct frontend DB writes |
| 9 | Course concepts have concrete jobs | Short mapping: routing/forms/auth/draft/testing | Reference W07/W10/W11–12/W13–14 with implemented files |
| 10 | Evidence covers rules and permissions | Actual test command summary +2 meaningful failure examples | State real vs stub tests, counts only from actual reports |
| 11 | Live demo | One clean “Demo” frame with task checklist | Walk scenario below; avoid slide narration during navigation |
| 12 | Delivered scope and honest limitations | Real repo/demo/Figma links, QR if useful, known limits | State what works; future approval/payments explicitly outside current API |

Speaker notes must include source references and whether images are Figma/mock or actual app. Use actual screenshots captured after implementation; label prototypes. Do not show fake passing terminal output or fictional deployment links. Product title and author names can be placeholders only during drafting, never final submission.

## Demo script and reset plan

Prepare isolated demonstration dataset: memberA/memberB/admin and equipment with stock5,stock2 andstock0. Credentials stored privately, never in deck/repository. Choose dynamic UTC start today+2 and return start+2; keep scripts relative to demo day.

1. Logged out, browse catalog, filter Camera, open camera. Point out unit/day rate and actual available quantity.
2. Log in memberA through selected-item callback. Quantity4 fails; set2. Return before start fails; then valid2-day period. Send request; show confirmation and persisted list on refresh.
3. Return to equipment to show stock unchanged; explain request is not a reservation. Edit own request quantity/dates; save. Demonstrate delete confirmation cancel, then delete a designated disposable request if time permits.
4. Switch to memberB and show memberA request is not listed (use retained memberA demo record); direct other-ID access denied if practical without exposing tokens.
5. Login admin. Add “Demo projector” with quantity2 and rate180; edit description/stock; show public data. Open memberA's retained request and edit/delete designated test record. Explain admin cannot create a member request.
6. Remove designated equipment; show it disappears from browse but referenced request history remains. Use a separate seeded record so earlier demonstration is not broken.
7. Show390px layout and one actual automated-test report. End on working product, not an editor error.

Reset via documented disposable test-data harness or clean dedicated database; never clear a shared database. Rehearse exact action order twice. Keep one valid request for history and another for deletion so demonstrations do not conflict. Record demo duration and adjust to official slot.

## Backup and supporting artifacts

Create a short local screen recording of the same deterministic flow after tests pass; hide credentials/tokens and use synthetic users. Capture6 desktop +3 mobile screenshots defined in document05 and selected tests with actual results/date. Provide offline PNG/PDF slides if platform supports export. A recording backup does not replace the real implementation or claim live availability.

Suggested outputs after execution: `docs/presentation/storyboard.md` (final edited narrative), editable `.pptx` or native slides link, PDF export if requested, speaker notes, `docs/evidence/` curated screenshots/report summary, Figma native link/version + exports, `docs/RELEASE-CHECKLIST.md`, `docs/KNOWN-ISSUES.md`. Do not create empty artifact files merely to satisfy this list.

## Final submission reconciliation

Official instructions are reconciled in document13. Verify final actual artifacts against: due date/timezone, upload destination, required repository visibility, deployed frontend/backend links, Figma view/prototype permissions, deck format, video length, contribution statement and report format. Confirm each URL works for intended evaluator without sharing credentials in public files. Never broaden access unasked. Required accounts/secrets belong in an approved private channel if evaluator needs them.

Final README should explain purpose, roles, functionality, architecture, runtime versions, install/env/backend setup, scripts, tests, screenshots, limitations and artifact links. Include that admin self-registration is course-specific, stock is not reserved, and prices are illustrative estimates. Backend attribution and image/font licenses stay present. Never imply production hardening or user studies that did not happen.
