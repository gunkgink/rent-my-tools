# Requirements and traceability

Authority: topic PDF p1/p3; verified supplied backend adds operational detail. Course lectures teach implementation techniques; every technique is not automatically a separately graded requirement. UI screen IDs are defined in document 04; tests in document 09.

| ID | Requirement | Screen / implementation | Acceptance evidence |
|---|---|---|---|
| R01 | Two roles: admin and member | S03 role select; session and server guards | AUTH-01, AUTH-04 |
| R02 | Registration accepts name, email, tel, role, password | S03 complete labeled form | AUTH-01 valid/invalid fields |
| R03 | Email/password login and logout | S02; global account menu | AUTH-02, AUTH-03 |
| R04 | JWT credential and protected API routes | NextAuth + server API adapter | AUTH-04, SEC-01 |
| R05 | Everyone can view equipment | S01, S04 public routes | EQ-01 logged out |
| R06 | Logged-in admin can add equipment | S10/S11 create | EQ-02 real persistence |
| R07 | Admin can view/update/delete equipment | S10/S11, confirmation | EQ-03, EQ-04 |
| R08 | Equipment IDs link updates, deletes, requests | API `_id`, route params | EQ-02 to RENT-01 |
| R09 | Equipment name/category/description/quantity/rental rate | Catalog/detail/admin forms | EQ-01 through EQ-03 |
| R10 | Member creates request: equipment ID, quantity, start, return | S05 | RENT-01 |
| R11 | Creating request does not immediately alter inventory | No client stock subtraction | RENT-02 before/after stock |
| R12 | Member views own requests | S06/S07; server/API ownership | RENT-03, SEC-02 |
| R13 | Member edits own request | S08 | RENT-04 |
| R14 | Member deletes own request | S07 delete dialog | RENT-05 |
| R15 | Admin views/edits/deletes any user's request | S12, S07/S08 admin context | ADMIN-01, ADMIN-02 |
| R16 | Start date not before today | Client + backend UTC checks | RULE-01 |
| R17 | Return date not before start | Date form errors | RULE-02 |
| R18 | Request quantity <= available stock | Fresh equipment + server result | RULE-03 |
| R19 | At most 3 units of the same equipment per request | Integer field/stepper | RULE-04 |
| R20 | Rental duration <=7 days | UTC date-only arithmetic | RULE-05 |

## Verified backend interpretation

- Today is UTC, not the browser's local calendar. At 00:30 Bangkok the accepted date floor can still be the previous local date. Show a nearby “Rental dates use UTC” help disclosure and a concrete earliest date; do not conceal the difference.
- `durationDays = (UTC(return) - UTC(start)) / 86400000`; allowed interval 0..7. Same date passes. December 1 to December 8 passes. December 1 to December 9 fails. Do not apply inclusive eight-calendar-date counting as the seven-day validation rule.
- Quantity must be a JSON number and integer, 1..3 and <=current equipment quantity. Stock zero means visible but not requestable.
- No aggregate reservation check: multiple requests and overlapping dates are allowed, even when their combined quantity exceeds stock. Each request is validated independently.
- Equipment removal is a soft delete, not a rental-history deletion. List/detail show active equipment only.
- Both roles may register, matching the assignment. Only members may POST a rental. Admin may manage existing requests across users; ownership cannot be reassigned.
- The backend reapplies all date/stock checks on update. A historical request whose start is in the past cannot be saved unchanged, even by an admin. UI must explain this, allow valid revised dates/equipment, and retain view/delete access; do not falsely promise a past-request edit exception.

## Scope discipline

Required paths come before enhancements. Useful additions: client-side search/category/sort, responsive filters, request draft persistence, clear estimate, image fallback, confirmation dialogs, retry and empty states. No approval queue, pending/approved/returned statuses, online payments, deposit, stock reservation calendar, physical pickup logistics, email delivery, password reset, ratings, multi-item cart, profile editing, inactive-equipment restoration, or user management service is available in the supplied API. Do not render controls for them as though they work.

User research is not supplied. Personas in this handoff are design hypotheses: a student borrowing equipment for a short project and a lab coordinator maintaining equipment and correcting requests. Validate against real classmates if access is available; never fabricate interviews, usability results, testimonials or usage statistics.
