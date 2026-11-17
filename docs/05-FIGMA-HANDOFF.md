# Figma construction and prototype handoff

This is a build specification, not a claim that a Figma file exists. Create native Figma components and editable frames when access is supplied; otherwise finish local specifications, asset manifest and screen captures and mark native Figma delivery pending. A screenshot collage is not an editable Figma deliverable.

## File and page structure

File: `Rent My Tools / Project 2`. Cover: product name, course, version/date, owner, link to repository, scope: public/member/admin. No invented team roster.

| Figma page | Contents |
|---|---|
| 00 Brief and flows | Requirements R01–R20; personas labeled hypotheses; sitemap; member/admin flow diagrams; backend constraints |
| 01 Foundations | Color variables, type styles, spacing/radii, grids, icons, image direction, contrast pairings |
| 02 Components | Reusable variants and interaction states from document03 |
| 03 Wireframes | Desktop/mobile structure for every S01–S12 screen |
| 04 Public | High-fidelity home/catalog/detail/login/register, loading/empty/error |
| 05 Member | Create/review, success/detail, list, edit, delete dialogs, profile |
| 06 Admin | Equipment list/add/edit/remove; all requests/detail/edit/delete |
| 07 Responsive and states | 390 mobile core flows, 768 tablet layouts, 320 stress cases, 1440 desktop; rule errors and failure frames |
| 08 Prototype and handoff | Named flow starting points, annotation legend, export-ready key frames, implementation comparisons |

## Layout and variables

Create primitive variables from document03 then semantic aliases, e.g. `button/primary/bg -> color/brand`, `field/border -> color/input-border`. Use one light mode for MVP. Number variables for spacing/radius. Text styles named `Display/Hero`, `Heading/Page`, `Heading/Section`, `Body/Default`, `UI/Label`, `UI/Supporting`, `Data/Rate`. Mirror code token names in component descriptions. Do not use arbitrary detached colors to patch individual frames.

Frames: 1440x1024 desktop, 768x1024 tablet, 390x844 mobile; heights may grow with scroll. Layout grids match document03. Create mobile views independently with responsive intent, not scaled desktop screenshots. Main content uses vertical Auto Layout, fill-container width, hug height; form fields stretch, buttons hug with minimum44px height; table row64px desktop; text wraps. Product-image region fixed aspect4:3. Padding and gap bind to variables. Set min/max widths deliberately on text/form panels and use constraints for anchored elements.

Header component variants guest/member/admin and desktop/mobile. Mobile open-menu overlay is a real prototype state. Product image swaps through nested instances; text properties for name/category/rate/quantity; boolean unavailable indicator. Never bake status text into photos.

## Component variants to actually create

- `Button`: hierarchy primary/secondary/quiet/danger; size regular/compact; state default/hover/focus/pressed/disabled/pending. Use nested icon property rather than hundreds of unnecessary combinations.
- `Field`: type text/password/number/date/select/textarea; state default/focus/error/disabled/read-only; label, value, hint, error text properties. Required semantic information must remain in description/annotation.
- `EquipmentTile`: available/zero/image-fallback/skeleton; width fill; name may occupy2 lines without hiding price.
- `QuantityInput`: minimum/interior/maximum/error, keyboard annotation; `DatePair`: empty/valid/past/reversed/over-limit.
- `RequestSummary`: incomplete/valid/sending/saved. Include estimate caveat in valid state.
- `Notice`: info/success/warning/error; icon plus text; `Dialog`: request-delete/equipment-remove; `EmptyState`: no data/no matches/no requests; `RequestRecord`: member/admin/mobile.

Annotate visual focus separately; Figma hover simulation is not evidence of keyboard accessibility. Add handoff notes for `aria-describedby`, live-region behavior, focus restoration, native date input behavior and URL state.

## Required screen/frame inventory

Name frames `S05 / Create request / Desktop / Valid`, consistently. Minimum high-fidelity coverage:

| Flow | Desktop | Mobile | State frames |
|---|---|---|---|
| Public | Home, catalog, item detail | All3 | Catalog loading/no matches/error; item stock0/not found |
| Auth | Login, register | Both | Invalid credentials; role select; registration error |
| Member | Create, list, detail, edit, account | Create/list/detail/edit | Every rental-rule failure; pending; success; empty; expired session; delete dialog |
| Admin equipment | List, add, edit | List/form | Validation, duplicate name, remove dialog, save failure |
| Admin requests | All requests, requester detail, edit | List/detail/edit | Other-user context, historical-start warning, removed equipment, delete |
| Responsive | Catalog/detail/form/table at768 | Stress sample at320 | Long name, Thai text, no image, wrapped error |

Avoid duplicating every component-state into a full-screen frame. Use a state sheet plus representative integration frames. No requirement may depend solely on an unlinked annotation.

## Clickable prototype scenarios

P1 Guest-to-member: start home -> browse -> camera -> log in -> request -> quantity2 -> start/return -> valid summary -> send -> saved detail -> requests. Include branch to register, explicit role and return to login. Show no reservation/payment claim.

P2 Validation: form -> quantity4 error; return before start; duration8 error; corrected duration7 -> success. Figma can use variants/variables or separate frames; clearly mark simulated data and dates, not live API behavior.

P3 Member maintenance: list -> own request -> edit quantity/dates/equipment -> save -> detail -> delete -> confirmation -> empty/list. Include cancel paths.

P4 Admin equipment: admin start -> add equipment -> public detail -> edit -> zero stock -> remove -> record gone from active list. History remains in requests.

P5 Admin request: all requests -> another member's record -> edit -> save -> delete. No create-on-behalf control.

P6 Mobile: catalog -> filters -> detail -> request -> keyboard/date validation -> success. Sticky action must not overlap summary or errors.

Interactions: instant route changes or short160ms dissolve; no decorative Smart Animate chains. Fixed headers/scroll containers should behave like the intended page. Set starting points with descriptive flow names, not “Flow1”. Every primary button must have an intentional destination or disabled rationale; close/cancel/back must work.

## Annotation template

Each screen: ID, route, permitted roles, R IDs, purpose, entry/exit routes, source endpoint, editable/read-only fields, constraints, desktop/mobile behavior, loading/error/empty outcomes, keyboard/focus note, asset source, implementation/test reference. Use a consistent side annotation panel outside export bounds.

## Figma QA and exports

1. Review all20 R IDs against frame inventory and prototype flows.
2. Inspect long names, category strings, tel formats and THB values without truncating essential information.
3. Check contrast, touch target44px,320px and200% zoom intent; record actual implementation checks later.
4. Walk every flow from starting point without editor intervention; ensure there are no unintended dead ends.
5. Export6 presentation frames as2x PNG: public catalog, equipment detail, valid request, member requests, admin equipment, admin all requests; also3 mobile frames (catalog/form/admin request).
6. Store selected exports at `docs/figma/exports/` with screen IDs and date/version; retain native Figma share link/version in `docs/figma/README.md` once created. Request permission before changing sharing access. Include an exported `.fig` only if export/access allows it and user wants it in repository.
7. Compare implemented screenshots against Figma at matching widths. Resolve functional deltas before polishing pixels. Keep final implementation-driven corrections in both artifacts, never present obsolete frames as final UI.
