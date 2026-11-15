# Official criteria reconciliation

Source: `../../Project-Submission-Presentation-Instructions_6aecab16d9430.pdf`,4 pages, reviewed16 Nov2026. This document supersedes earlier duration/deadline assumptions in the initial plan. Topic-specific rules still come from the Project2 topic and supplied backend.

## Dates and required submission

- Deadline: **Wednesday18 November2026,23:00 Asia/Bangkok** (Thai year2569).
- By that deadline: push program to team GitHub, deploy to Vercel, and submit in MyCourseVille assignment **PROJECT SUBMISSION**.
- Text answer: team GitHub repository URL and Vercel URL.
- Attach presentation slide file. Slides must also contain GitHub and Vercel URLs; include UI-design link when available.
- Attach UI-design file, e.g. Figma export. A link alone does not fulfill the stated file-attachment requirement.
- UI-flow documentation must show actual flow design. The instructor explicitly rejects arranging finished-work screenshots as the design artifact. Include editable flow diagrams, wireframes, component/state decisions, validation branches and prototype links. Do not backdate artifacts or misrepresent work chronology.

Figma destination supplied by user: https://www.figma.com/design/r9z2CY5w8PAghXRsUqAvG9/Untitled . The connector is disabled by administrator; signed-in browser editing succeeded. Three native pages, six editable screen frames and a frame-level member prototype were created. Native export download was declined; no .fig export is claimed.

## Evaluation weights

Term project35%: functions20%, work quality5%, UX/UI3%, UI-flow documentation3%, presentation/demo4%. Deploying to Vercel accounts for1% within that4%. Additional functionality has up to2% extra credit; do not claim guaranteed credit for search/drafts without evaluator confirmation.

## Required live demonstration sequence

| Step | Demonstration | Function score | Implementation / current evidence |
|---|---|---|---|
| 0 | Topic and UI flow | — | Topic2, docs01/04/05; native flow created; downloadable .fig pending |
| 1 | Register user + validation |2 | `/register` with all fields; explicit live journey verification required |
| 2 | Member login |1 | NextAuth Credentials; browser lifecycle verified |
| 3 | View equipment |1 | Catalog/detail; real API and browser verified |
| 4 | Create request |2 | Real saved request; browser verified |
| 4a | Invalid-condition creation |1 | Quantity/date/stock limits; pure tests and API verified; include visible live failure |
| 5 | View own requests |2 | `/requests`; API ownership verified |
| 6 | Edit own request |2 | Browser lifecycle verified |
| 7 | Delete own request |2 | Dialog and persisted deletion; browser verified |
| 8 | Member logout |1 | Server/backend cleanup + NextAuth sign-out; include in journey rehearsal |
| 9 | Admin login |— | Browser lifecycle verified |
| 10 | Admin views any request |2 | `/admin/requests`; real API cross-user check verified |
| 11 | Admin edits any request |2 | Shared detail/edit; real API verified |
| 12 | Admin deletes any request |1 | Shared detail delete; real API verified |
| 13 | Admin creates equipment |1 | Browser lifecycle verified |
| 14 | Additional functionality |extra | Optional search/filter, safe draft restore; no promised extra score |
| 15 | Team work division |— | Must use actual team data; GitHub Insights > Contributors preferred |
| 16 | Show Vercel deployment |within presentation4% | Not deployed; real URL required |

Score-bearing function rows total20. Backend permissions remain role-specific even where slides use the generic word booking.

## Presentation rules

- **7 minutes** for ordered presentation/demo, then **3 minutes** questions. Overrun penalty0.5 point/minute.
- Demonstrate through the actual program; if deployed, present the deployed version.
- Seed equipment in advance. Keep a separate retained request for the admin portion so member deletion does not remove the admin example.
- Show/describe actual team division at the end; GitHub contribution view preferred. Do not fabricate commits or contributors.
- All members wear student uniform and keep camera on. Join Zoom at least30 minutes early; schedule may move earlier if preceding slots are empty. Late penalty1 point/minute.
- Booking edits permitted for own group until17 Nov2026,23:00 Bangkok; altering another group carries5-point penalty. No booking-sheet edit has been performed or authorized here. Out-of-hours18Nov presentation requires prior instructor arrangement.

## Remaining grade-critical items

Final UI-flow export (online native flow and local SVG created), actual slide attachment format, Vercel deployment URL, team identities/contribution division, booked presentation slot and final seven-minute rehearsal. Local implementation/testing is not the same as complete submission. Do not mark these items complete without observed artifacts/actions.
