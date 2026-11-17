# API contract and integration traps

Evidence pinned in document02. Base local API `http://localhost:5000/api/v1`. All paths below relative to `/api/v1`. Read actual Swagger/source again if backend version changes. Never infer endpoints from frontend route names.

| Method/path | Access | Body | Success data |
|---|---|---|---|
| POST `/auth/register` | Public | name,email,tel,role,password | 201 `{id,name,email,role,token}` |
| POST `/auth/login` | Public | email,password | 200 same auth shape |
| GET `/auth/me` | Authenticated | none | 200 User (`_id`,name,email,tel,role,createdAt) |
| GET `/auth/logout` | Authenticated | none | 200 `{}`; clear backend cookie only |
| GET `/equipment` | Public | none | 200 Equipment[] active only, name sort, count |
| GET `/equipment/:id` | Public | none | 200 Equipment;404 inactive/missing |
| POST `/equipment` | Admin | name,category,description,quantity,rentalRate | 201 Equipment |
| PUT `/equipment/:id` | Admin | allowed editable equipment fields | 200 updated Equipment |
| DELETE `/equipment/:id` | Admin | none | 200 `{}`; marks isActive=false |
| GET `/rentals` | Member/admin | none | 200 populated Rental[] (own/all),count |
| GET `/rentals/:id` | Owner/admin | none | 200 populated Rental |
| POST `/rentals` | Member only | equipment,quantity,startDate,returnDate | 201 populated Rental |
| PUT `/rentals/:id` | Owner/admin | optional equipment,quantity,startDate,returnDate | 200 populated updated Rental |
| DELETE `/rentals/:id` | Owner/admin | none | 200 `{}`; actual record deletion |

Envelopes: `{success:true,data:T,count?:number}` or `{success:false,error:string}`. Auth token is `data.token`, not top-level `token`. Auth uses `id`; models use `_id`. Normalize once in typed adapter. Protected requests require `Authorization: Bearer <backend JWT>`; backend cookie alone is insufficient.

Equipment shape: `_id`, `name`, `category`, `description`, `quantity:number`, `rentalRate:number`, `isActive:boolean`, timestamps. Quantity integer>=0; rate>=0; name unique; category/description/name required trimmed strings. No image, total, deposit, location, rating or booking status fields.

Rental shape: `_id`, `equipment: EquipmentSummary | null`, `user: UserSummary | null`, quantity, startDate/returnDate ISO timestamps, timestamps. Equipment populated fields name/category/description/quantity/rentalRate/isActive plus `_id`. User populated fields name/email/tel/role plus `_id`. Defensive null handling prevents crashes if referenced records are missing. Show “Equipment unavailable”/“Requester unavailable”; do not fabricate values. Member record fetching should remain server-scoped even though UI can read some populated owner fields.

Mutation request example:

```json
{"equipment":"<real 24-character equipment ID>","quantity":2,"startDate":"2026-12-01","returnDate":"2026-12-08"}
```

Dates in tests/demos must be generated relative to current UTC day. Example above illustrates seven-day semantics, not a permanent valid test fixture. JSON quantity is a number, dates canonical `YYYY-MM-DD`, no hidden time/local offset. Do not submit populated objects or `user` ownership. Ownership is set from credential and immutable on update.

## Date and amount logic

Parse date-only strictly: regex then construct UTC date, round-trip toISOString().slice(0,10), reject impossible dates including Feb30. Compute today from UTC clock; inject clock in unit tests. Date differences operate on UTC midnight, not local milliseconds across DST. API returns timestamps; display their date-only UTC portion to avoid a day shift. UI can display localized labels while preserving canonical payload.

Backend defines no total or billable same-day rule. UI estimate is the explicitly proposed max(1,dateDifference) daily-rate calculation in document04; never call it amount due, charged price or saved contract. Historical records have current equipment rate, not a stored snapshot. Use “Current rate”; any re-estimate must be labeled current and illustrative.

## Error adapter

Allowlist known validation messages into field errors; unknown errors become safe form/page notices. Distinguish HTTP failures, invalid JSON/body, network timeout, and auth expiry. Never render raw stack, E11000 payload, Mongo URI or token. Upstream duplicate-name/email or cast validation may return500; do not assume422/409. Server logging may record sanitized error category/status/correlation only. Never automatic-retry POST/PUT/DELETE after an ambiguous timeout; fetch list/detail and let user verify whether save occurred before repeating, because no idempotency key exists.

On400 retain values and attach rule errors;401 invalidate local session path;403 forbidden;404 list recovery;429 stop retries;500 generic retry. Field-specific duplicate mapping only when safely identifiable, otherwise say the save failed and retain input. Precheck duplicates helps UX but is not authoritative under races.

After successful create/update/delete refresh public equipment and relevant request/admin lists. Request creation must not decrement quantity locally. Re-read `/auth/me` for authoritative role at protected operation boundaries and forward backend token; never trust submitted role or client context for authorization. Cache no private responses.

## Missing capabilities to respect

List endpoints return complete active equipment / scoped rentals; no server search, pagination, availability interval query, inactive archive, upload, user list, profile update or request approval endpoints. Filter/sort existing data locally. Do not fake feature endpoints or bypass API with MongoDB writes. Backend's100/IP/10min limit can affect SSR through one shared frontend IP: avoid polling/refetch-on-every-keypress and parallel E2E bursts; document any required development-only rate-limit configuration change separately.
