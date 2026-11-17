# Design system: a campus equipment library

## Pass one: explore the brief

Audience: students seeking a camera for an assignment, a projector for an event, a notebook for a workshop, or sports equipment for a short activity. Admin is the equipment coordinator. Main job: find an item, understand its rate and quantity, send a valid dated request, and manage it afterward.

Brand: **Rent My Tools**. Plain-language descriptor: **Equipment for your next project**. Voice: useful, direct, calm. The word tools means equipment across categories. Do not theme the product solely around drills or construction sites.

Two viable layout ideas:

```text
A. Equipment-library workbench (chosen)
[Brand        Browse equipment       My requests / account]
[Equipment for your next project.] [large real equipment still life]
[Find equipment __________________] [Browse equipment]
[Cameras] [Projectors] [Computers] [Sports]
[Camera / rate / quantity] [Projector / rate] [Notebook / rate]

B. Operations console (rejected for public entry; retained for admin)
[Brand | Equipment | Requests] [account]
[Search and filters _______________________]
[Dense equipment rows with names, stock, rates, actions]
```

A supports recognition and discovery for an occasional renter. B is faster for repeated administrative comparison but asks a first-time student to decode a database-style list. Public view uses A; admin uses a restrained table rather than inventing dashboard metrics.

Compact concept tokens: Paper `#FFFFFF`, Mist `#F3F6FA`, Ink `#18263A`, Cobalt `#2446C8`, Slate `#526277`, Signal `#F2C94C`. Typeface: Barlow Semi Condensed for compact equipment headlines; IBM Plex Sans for readable labels/forms. Main alignment is left, numerical columns right. Memorable element: equipment isolated against a pale blue shelf-like image field; real equipment remains the focal point.

## Pass two: critique and revision

An early generic concept would place an oversized slogan above identical shadowed cards, floating stats, and a decorative color wash. Those elements do not help someone compare a camera with a projector. Revise to a short, functional hero with actual category equipment and an immediate catalog entry; product tiles use image + typography and one structural divider, no outer panel shadow. Use an intentionally bordered summary panel only on the detail/request screen, where boundaries explain the user's selected request. Admin remains a dense working table. No fake availability calendar, rental counters, ratings, testimonial strip, gradient blobs, all-caps eyebrows, or decorative serial numbers. Component radii differ by purpose rather than applying one radius everywhere.

The design's distinctive feature is the equipment photography and compact specification-led composition. Keep the rest quiet. The prototype must remain useful without animation or images. Figma and implemented screenshots need a final critique against this paragraph.

## Tokens: canonical values

Define CSS custom properties and identically named Figma variables. Light theme only for MVP.

| Token | Value | Role |
|---|---|---|
| color/surface | #FFFFFF | Main panels, input background |
| color/canvas | #F3F6FA | Page canvas and equipment image field |
| color/text | #18263A | Headings and primary text |
| color/text-muted | #526277 | Descriptions, secondary metadata |
| color/brand | #2446C8 | Primary buttons, selected navigation, links |
| color/signal | #F2C94C | Small library mark / highlighted date span; use dark text |
| color/brand-hover | #19349B | Primary hover/pressed |
| color/border | #CFD8E3 | Nonessential separators/panel outlines |
| color/input-border | #738399 | Visible interactive boundary |
| color/focus | #2446C8 | 3px focus ring with 2px white offset |
| color/success | #166534 | Success text and icon |
| color/success-bg | #EDF8F0 | Success notice |
| color/danger | #B42318 | Errors/destructive action |
| color/danger-bg | #FFF1F0 | Error notice |
| color/warning | #7A4A00 | Stock warning text |
| color/warning-bg | #FFF7D6 | Warning notice |

Do not use signal yellow as small text on white or color alone for state. Verify WCAG AA contrast for actual combinations: 4.5:1 normal text, 3:1 large text and essential control boundaries. Border token is for structural dividers, not a sufficient input boundary. Disabled styles still need explanatory copy where an action is unavailable.

Typography: self-host licensed font files when possible; record source and license. Headings `Barlow Semi Condensed` weight 600; all body/UI `IBM Plex Sans` 400/500/600; Thai fallback `Noto Sans Thai` then sans-serif. Full bilingual UI is not required. Thai names/descriptions must display without clipping.

| Style | Desktop size/line | Mobile size/line | Weight |
|---|---|---|---|
| Hero | 56/60 | 36/40 | 600 display |
| Page title | 40/46 | 30/36 | 600 display |
| Section title | 28/34 | 24/30 | 600 display |
| Item name | 22/28 | 20/26 | 600 display |
| Body | 16/24 | 16/24 | 400 |
| Label/button | 14/20 | 16/24 inputs | 500/600 |
| Supporting | 14/20 | 14/20 | 400 |
| Rate | 24/30 | 22/28 | 600; tabular numerals |

Body maximum measure 68ch; never justify prose. No all-caps visual labels. Never shrink essential table text below 14px to fit. Input font >=16px on mobile.

Spacing scale: 4,8,12,16,24,32,48,64,80px. Grid: 4px base, 8px main rhythm. Radii: 4px fields, 8px product-image region, 12px request panel, full pill only category choices. Shadows only overlay/dialog `0 16px 48px rgba(24,38,58,.16)` and subtle sticky bar `0 -2px 12px rgba(24,38,58,.08)`; no tile shadow wall.

Content widths: max 1280px, centered outer container with left-aligned contents. Desktop 1440 has 80px sides, 12 columns, 24px gutters. Tablet 768 has 24px sides, 8 columns, 16px gutters. Mobile 390 has 20px sides, 4 columns, 16px gutters; at 320 reduce side inset to16. Desktop header 80px, mobile64px. Section gaps64 desktop/40 mobile. Do not hard-code frame heights in production.

Breakpoints: <640 small; 640–1023 medium; >=1024 large. Catalog 1 column small (2 only when each tile can remain >=240px), 2 medium, 3 large. Admin table transforms into labeled request/equipment records below768; preserve all fields and actions. Detail two-column from1024: flexible 7 columns imagery/info, 5 summary; stack beneath. Sticky summary top104px desktop; mobile bottom action bar links to form and never obscures fields, validation or footer. Add bottom safe-area padding.

## Components and behavior

| Component | Anatomy | Variants / states |
|---|---|---|
| Brand | Small shelf/bracket mark + Rent My Tools wordmark | Header/footer, dark text; no brand imitations |
| Button | Label, optional purpose icon, progress slot | Primary/secondary/quiet/danger; default/hover/focus/pressed/disabled/pending; min44px height |
| TextField | Label, input, hint, error | Text/email/tel/password/number/date; required, invalid, disabled, read-only |
| CategoryChoice | Text + selected indicator | Default/hover/focus/selected; selected state uses text and fill |
| EquipmentTile | 4:3 image, category, name link, per-day unit rate, stock text | Available/zero stock/image fallback/loading |
| QuantityInput | Labeled integer input + minus/plus buttons | Bounds 1..min(3,stock); allow typing, explain invalid input |
| DatePair | Start/return, UTC helper, duration feedback | Empty/valid/reversed/past/>7 days |
| RequestSummary | Equipment, quantity, dates, rate, estimate, explanatory note | Draft/submitting/saved/error |
| RequestRecord | Equipment, date span, quantity, created date, view/edit/delete | Member/admin adds requester name/email |
| Notice | Icon, concise text, optional action | Information/success/warning/error; not only color |
| ConfirmDialog | Title, consequence, cancel and explicit destructive action | Delete request/remove equipment; focus trapped and restored |
| EmptyState | Short heading, explanation, useful action | No equipment/no matches/no requests |
| Skeleton | Stable image/text shapes | No flashing; match final dimensions |

Interactive motion: 120ms button color, 160ms filter/menu, 180ms dialog. No scroll reveal dependency, infinite marquee, parallax or automatic carousel. Reduced-motion mode removes nonessential transitions; dialogs still convey state instantly.

## Images and seed content

Hero brief: clean photographed still life of a mirrorless camera, compact projector and closed notebook on a pale blue library counter; soft neutral light, accurate proportions, empty space for placement; no text baked into image, no borrowed logos as brand. Use one focal image, not a collage of floating cards. Product image must show the exact item when known; otherwise labeled category illustration. No image field/upload exists in backend. Maintain a local asset manifest keyed by equipment ID when seeded, with category fallback for newly created items; never send image paths as undocumented API fields.

Example seed records (fictional teaching inventory, not existing database facts): Mirrorless camera kit / Camera / 5 / THB250; Portable projector / Projector / 2 / THB180; Workshop notebook / Computer / 4 / THB300; Tripod / Camera / 8 / THB60; Badminton racket / Sports / 6 / THB40; Basketball / Sports / 0 / THB30; HDMI presentation kit / Accessories / 3 / THB25; USB microphone / Audio / 2 / THB90. Descriptions must name what is included; do not promise accessories that are not in seeded text. Use generic category names from real records; category is a free string, not a backend enum.

Proposed file organization: `public/images/equipment/`, `public/fonts/`, `docs/ASSET-LICENSES.md` with creator/source/license/attribution/alt text/usage. No hotlinked product images or scraped copyrighted catalog photos. Use appropriately licensed assets or original/generated assets if available. If unavailable, use intentional local category illustrations; do not block functional delivery or claim illustrations are product photos.
