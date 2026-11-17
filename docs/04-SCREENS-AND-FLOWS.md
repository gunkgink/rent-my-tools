# Screens, navigation and interaction specification

All routes need loading, API-error/retry, not-found where applicable, keyboard navigation, mobile layout, and auth-resolution states. Never show an empty list when the API failed. IDs are stable across Figma, tests and presentation evidence.

## Route and permission map

| ID | Route | Access | Purpose |
|---|---|---|---|
| S01 | `/` and `/equipment` | Public | Compact home; complete searchable catalog |
| S02 | `/login` | Public | Email/password login; safe return target |
| S03 | `/register` | Public | Full registration including role |
| S04 | `/equipment/[id]` | Public | Equipment details; role-aware next action |
| S05 | `/requests/new?equipment=[id]` | Member | Editable form, review summary, create |
| S06 | `/requests` | Member | Own request list |
| S07 | `/requests/[id]` | Owner or admin | Request detail, saved confirmation, edit/delete |
| S08 | `/requests/[id]/edit` | Owner or admin | Edit full request, preserve owner |
| S09 | `/account` | Authenticated | Read-only name/email/tel/role, logout |
| S10 | `/admin/equipment` | Admin | Equipment working table |
| S11 | `/admin/equipment/new`, `/admin/equipment/[id]/edit` | Admin | Add/edit equipment |
| S12 | `/admin/requests` | Admin | All-user request table; requester context |
| X01 | Global 403/404/error boundaries | Contextual | Recovery without private-data leaks |

Header public: brand links `/`, Browse equipment, Log in, Create account. Member: Browse equipment, My requests, account menu. Admin: Browse equipment, Manage equipment, All requests, account menu. Current location is indicated by text weight + underline/shape, not color only. Mobile menu is a labeled button; supports Escape, click-outside, focus return. Do not flash admin/member links before session resolves.

## Primary flows

```text
Guest -> catalog -> detail -> Log in to request -> login or registration
      -> validate safe callback -> selected equipment request form
Member -> form -> valid input -> Send rental request -> persisted detail confirmation
       -> My requests -> view -> edit -> Save changes -> refreshed detail
       -> Delete request -> confirm -> refreshed list
Admin -> equipment list -> add -> detail/list -> edit -> save -> remove confirmation
      -> All requests -> view other member -> edit -> save -> delete confirmation
Expired session -> preserve nonsecret draft -> log in -> revalidate stock/dates -> continue
```

Account creation leads to login with “Account created. Log in to continue.” Backend registration also returns a token; discard it server-side instead of fabricating a NextAuth session. Preserve the safe equipment callback. This costs one extra login but provides a straightforward, testable Credentials flow. Never persist password or automatically reuse credentials in browser storage.

## S01: home and catalog

Home has 80px header; 2-column hero roughly 400px tall desktop, stacked mobile; heading “Equipment for your next project.”; one sentence “Find cameras, projectors, computers and more for short rentals.”; primary “Browse equipment”; product image. Below: actual category choices and first six API items, “View all equipment” when applicable. Small explanatory strip: “Choose equipment. Set your dates. Send a request.” Numbers only appropriate here as actual sequential steps; no fabricated metrics.

Catalog: heading “Browse equipment”; result count; search label “Search equipment” with name/category/description matching; category chips from actual data; available-only checkbox; sort Name A–Z / Rate low–high / Rate high–low. URL stores `q`, `category`, `available`, `sort`; defaults omitted. Filter in memory after public list fetch because backend lacks query filtering/pagination. No server pagination controls. Search typing debounces ~200ms; client filtering does not require another API request. No-results state “No equipment matches these filters.” with “Clear filters”. API-empty state “No equipment listed yet.”; admin link only if role permits.

Tile content: category, name, rate “THB 250 / item / day”, “5 available” or “None available”, link “View equipment”. Zero stock tiles stay visible. Entire tile may have one primary detail link; avoid nested links/buttons. Do not claim date-specific availability. On image failure use category art with accessible fallback.

```text
Desktop catalog (1440)
| 80 | Browse equipment                                  8 items | 80 |
|    | Search equipment [________________________]  Sort [Name]  |
|    | All | Cameras | Projectors | Computers | Sports | ...     |
|    | [4:3 image]       [4:3 image]        [4:3 image]           |
|    | Camera kit        Projector          Notebook             |
|    | THB250/item/day   THB180/item/day     THB300/item/day       |
|    | 5 available       2 available        4 available           |
```

## S02/S03: authentication

Desktop form width440, contextual equipment-library artwork on remaining side; mobile single column, no oversized illustration. Login: email, password with labeled show/hide, “Log in”, registration link. No forgotten-password dead link. Invalid credentials message: “Email or password is incorrect.”; network failure: “Could not reach the service. Try again.”; 429: “Too many attempts. Wait a few minutes and try again.” Do not distinguish nonexistent account.

Register: name, email, telephone, role select (Member default; Admin option), password (minimum6), confirm password (client-only equality), “Create account”, login link. Course-context helper for role: “Members send requests. Admins manage equipment and requests.” No profile address/payment/date of birth. Trim textual fields, lowercase email, preserve password exactly. Telephone stored as a string; allow +, spaces and local formats, require nonblank rather than invent a ten-digit-only rule. Show required marker with explained meaning, browser autocomplete appropriate to each input, form errors near fields and a focusable summary after failed submit. Do not erase values on errors.

## S04: equipment detail

Breadcrumb Browse equipment > item name; large image (4:3); category and heading; full description; quantity/rate definition list. Right panel contains rate, stock, rules, role-aware CTA. Guest: “Log in to request”; member: “Request equipment”; admin: “Edit equipment” and “Manage requests”. Admin cannot create a member request. Stock0: “No units available” with no active create CTA; keep browsing link. Missing/inactive item: 404 with catalog recovery, no blank form.

## S05/S08: create/edit request

Desktop left (7 columns): heading, equipment selection summary, quantity, start date, return date, UTC guidance, validation, action row. Right (5 columns): selected equipment/rate/quantity/dates/duration/estimate and request semantics. Mobile: equipment summary, form, price breakdown, action; no checkout pattern.

```text
| Request equipment                      | Your request             |
| Mirrorless camera kit  [Change item]    | Camera kit, 2 units      |
| Quantity [-] [2] [+]                    | Start: 10 Dec            |
| Start [YYYY-MM-DD]  Return [YYYY-MM-DD]  | Return: 12 Dec           |
| Rental dates use UTC. Earliest: ...     | Duration: 2 days         |
| Up to 3 units, for up to 7 days.        | THB250 x 2 x 2 days      |
| [Send rental request] [Cancel]          | Estimated cost THB1,000  |
|                                        | No payment collected.    |
```

Changing equipment opens catalog selection route/link while preserving nonsecret draft; edit must support selecting a different active item because backend permits it. Use a searchable labeled select if the list is small. Do not permit ownership reassignment. Quantity max follows selected equipment; on equipment change keep user-entered quantity visible and mark invalid if too high instead of silently changing it. Date fields may use accessible native inputs; a custom calendar requires complete keyboard support and equivalent text/date entry. Min/max hints must not replace validation.

No prefilled dates that silently become requests; show placeholders, default quantity1. User reviews the visible summary on the same page; no extra multi-step checkout needed. Estimate assumptions: THB, billable days=max(1,durationDays), current per-day rate x quantity x billable days; label “Estimate only. No payment collected.” Backend has no total/billing rule; this is a UI illustration, not persisted or charged. For invalid/incomplete fields show “Choose valid dates to estimate.” Do not send total/status/price fields to API. See decision register for currency/billing confirmation.

Before submit revalidate current rules and availability; rely on final API validation for races. During submit disable duplicate submission, label “Sending request…”/“Saving changes…”, preserve inputs. On success navigate to S07 with a one-time inline notice “Rental request created.” or “Changes saved.”, render returned authoritative data and clear only the successful draft. Request note: “Sending a request does not reserve equipment or reduce available stock.” This explains the domain without API jargon.

On edit display read-only requester for admin, existing values, “Save changes”, “Cancel”. If original start is past, warn: “This request starts in the past. Choose a start date of [UTC today] or later to save changes.” If equipment was removed show its historic populated name and “Equipment removed”; require selecting an active item to save. Allow cancel/view/delete. Keep server-returned errors as inline notice; refresh changed stock and give the user a chance to amend, never silently retry a mutation.

## S06/S07: requests

List sorted start date ascending as API; optionally provide newest/earliest client sort. Rows: equipment, quantity, start, return, actions. Title “My requests” with “Browse equipment”; empty “You have no rental requests yet.” and “Browse equipment”. No fake state pills. Date-derived labels, if used, must say “Date window: upcoming/current/past”, never “Approved”, “Active rental” or “Returned”. Prefer dates only for MVP.

Detail shows request reference (full ID copy only on user action; shortened display okay), equipment and removed state, quantity, dates, rate context labeled current, creation timestamp; admin sees requester name/email/tel. Do not imply a historical price was locked when rate changes. Member does not see other-user directories. Delete dialog: “Delete this rental request?” / “This removes the request. It cannot be restored.” / “Keep request” / “Delete request”. Await success, then navigate list and announce “Rental request deleted.” No undo toast because API does not support restore. If failure keep record and retry action available.

## S09–S12: account and administration

Account read-only profile uses `/auth/me`; display tel from profile, not missing auth response. No edit/password-change controls without endpoints.

Admin equipment list: title, “Add equipment”; search, category; columns Name / Category / Available / Rate per day / Actions. Stock is direct available quantity field, not computed rentals. Add/edit fields: name, category (free text with suggested existing categories), description textarea, available quantity (integer>=0), rental rate (number>=0). Required all5 fields; 0 stock and 0 rate valid. Do not add a form upload field without a real storage/API decision. Name uniqueness failure must not lose form content. Create routes to saved detail or list; edit refreshes both public and admin surfaces. “Remove equipment” dialog explains “This removes equipment from browsing. Existing requests remain.” No restore button or inactive archive screen: API cannot list inactive items.

Admin requests: title “All requests”; client search equipment/requester, optional date sort; columns Equipment / Requester name+email / Quantity / Start / Return / Actions. Detail is S07 with a clear “Back to all requests” link. Requester telephone appears only in detail where useful. Deleting a member's request names the equipment/requester in confirmation; create action absent. Mobile table becomes semantic record cards with visible labels and named actions; do not rely on inaccessible horizontal overflow menus.

## Cross-cutting states and copy

| State | UI response |
|---|---|
| Initial loading | Layout-sized skeleton, “Loading equipment/requests”, no invented data |
| Offline/network | Keep unsent form; show retry, no false success |
| 401 | Clear session/private caches, preserve nonsecret draft, safe login return |
| 403 | “You do not have access to this page.” link to permitted home |
| 404 | “This equipment/request could not be found.” relevant list link |
| 429 | Stop automated retries; display wait guidance, honor Retry-After if supplied |
| 500/unexpected body | “The service could not complete this action. Try again.”; no stack/DB details |
| Stale stock | “Only [n] units are available. Choose a smaller quantity.” |
| Invalid quantity | “Choose a whole number from 1 to [max].” |
| Past date | “Choose [earliest date] or later.” |
| Reversed dates | “Return date must be on or after start date.” |
| Too long | “Choose a return date within 7 days of the start date.” |

Success notices use polite live region; errors use summary/focus plus field descriptions. Dialog traps focus, Escape cancels when safe, closing returns to trigger or logical list heading if record vanished. Dirty forms warn on internal cancel/navigation where feasible; never trap the user. Only nonsensitive create drafts persist; admin and edit forms do not persist across accounts.
