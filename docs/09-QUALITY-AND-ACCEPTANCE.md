# Quality and acceptance protocol

Requirement tests verify observable behavior, not component internals or wording snapshots. Each result records date, commit, environment (stub/real/local/deployed), command/manual steps and artifact. Planned tests below have NOT been run for a frontend; no application exists yet.

## Test matrix

| Test ID | Scenario | Expected |
|---|---|---|
| AUTH-01 | Register complete member and admin; missing/invalid fields; confirm mismatch | Required values sent; password>=6; role exact; success -> login; failures retain form |
| AUTH-02 | Correct/incorrect login, callback with equipment; refresh | Real session/profile, safe return; generic credentials error |
| AUTH-03 | Logout; back/reload; second tab; backend logout failure | Local session/private state cleared even on upstream failure |
| AUTH-04 | Guest deep link; member admin page/action; admin member-create | Login/403 as appropriate; no private response rendered |
| AUTH-05 | Backend JWT expires while NextAuth cookie remains |401 causes reauthentication; nonsecret draft retained, no silent failure |
| EQ-01 | Guest list/detail; zero stock/rate; no image; long/Thai content | All fields legible; no request allowed atstock0; rate0 rendered correctly |
| EQ-02 | Admin creates unique equipment then reload/public browse | Real ID and all5 fields persist and appear publicly |
| EQ-03 | Admin updates name/category/description/quantity/rate | Real data refresh; integer/nonnegative rules enforced |
| EQ-04 | Admin removes equipment referenced by request | Disappears publicly; request history remains readable |
| EQ-05 | Duplicate equipment name, negative/fractional stock, negative rate | Safe errors; no false save or lost form |
| RENT-01 | Member creates valid request from selected item, reloads | Correct equipment/user/quantity/dates persisted |
| RENT-02 | Stock before/after multiple requests incl overlapping dates | Quantity unchanged; independent requests allowed |
| RENT-03 | Two members each list and view requests | Each sees own only; other ID rejected |
| RENT-04 | Edit quantity/dates then switch equipment; reload | Updated fields persist; owner unchanged |
| RENT-05 | Delete cancel then confirm | Cancel retains; confirm deletes; no unsupported undo |
| RENT-06 | Historical start or removed equipment on edit | Clear caveat; valid replacement values required; view/delete work |
| RENT-07 | Double-click send and slow network | Single local submission; no duplicate click requests |
| RENT-08 | Timeout after ambiguous server success | No automatic resubmit; user can verify saved list/detail |
| RULE-01 | Yesterday/today/tomorrow at frozen UTC; Bangkok midnight edge | Reject only earlier than UTC today |
| RULE-02 | Return before start; same date; invalid calendar date | Before/invalid rejected, same date allowed |
| RULE-03 | Stock2: request2 then3; stock changes5->1 before save | <=stock passes; stale higher value rejected with retained inputs |
| RULE-04 | Quantity0,1,3,4,-1,1.5,NaN,blank,string | Only numeric JSON integer1..3 within stock allowed |
| RULE-05 | Duration0,1,7,8; leap day/month/year boundaries |0/1/7 pass,8 fails; strict date arithmetic |
| ADMIN-01 | Admin lists and edits both members' requests | Both visible/editable; requester context correct |
| ADMIN-02 | Admin deletes another member request | Confirm -> real delete; member list refresh reflects change |
| SEC-01 | Direct calls to private actions without credential/with wrong role | Denied server-side, independent of UI |
| SEC-02 | Tamper ID/user/role/total in form or payload | No ownership escalation; allowlist drops unsupported fields |
| SEC-03 | Inspect browser storage/session endpoint/rendered HTML/logs | No backend JWT/password/DB credential in public output |
| SEC-04 | External callback URLs/protocol-relative values | Reject; safe local destination |
| STATE-01 | Save draft, refresh, successful send, logout/switch account | Restore valid draft; clear on success/logout; no account leakage |
| STATE-02 | Stale draft dates/item deleted/stock reduced | Revalidate, explain, no silent submission |
| FAIL-01 | API empty vs network500 vs429 vs malformed response | Distinct empty/error states; no fake data or retry storm |
| FAIL-02 | Equipment/request404, populated relation null | Contextual recovery; no runtime crash |
| UI-01 | Search/category/available/sort, back/forward URL | Correct result set/order, state restored |
| UI-02 | Invalid form -> corrected -> submit failure -> retry | Focus/error relationships usable; values retained |
| UI-03 | Keyboard menus, stepper, dialog, date inputs | All actions operable, focus restored, Escape behavior correct |
| UI-04 |320/390/768/1024/1440 and200% zoom | No lost content/actions; no unintended page-level overflow |
| UI-05 | Reduced motion, contrast, image failure and slow fonts | Usable without animation/photos; no major layout shifts |
| DEPLOY-01 | HTTPS real API auth + request/admin smoke | Correct origins/cookies/env; persists on reload |

## Layer allocation

Jest pure functions: strict dates, injected UTC today, duration boundaries, quantity/rate validation, estimates labeled assumptions, safe redirect sanitizer, response normalization. Freeze clock and use table-driven cases. Client validation is not a substitute for backend boundary tests.

RTL: RentalForm renders labels and errors, quantity/equipment changes update constraints, pending disables duplicate action, server errors preserve input, dialog keyboard focus, selected filters/result count. Prefer role/label queries; avoid CSS-class assertions. Do not attempt to unit-render unsupported async Server Components as though client components; verify those through integration/E2E.

Cypress: one real happy path per role plus CRUD and permission/boundary checks against disposable backend. Seed deterministic accounts/equipment via test harness, reset only dedicated test records/database. Use unique test identifiers, dynamic future dates, no personal data. Separate Cypress/Jest TypeScript ambient `expect` types (W14p29). Avoid arbitrary waits; await requests/UI conditions. Do not disable isolation for convenience.

SSR fixtures: browser `cy.intercept` cannot stub server fetches. Run a standalone controllable fake API service for offline/error/empty cases and point server-only BACKEND_URL at it in a separate test process. This validates UI handling, not backend authorization. Real integration must run separately and be labeled. Avoid a production-accessible test backdoor or a secretless public seed endpoint. Rate limit100/IP/10min means pace/shard carefully or explicitly configure isolated test backend; never weaken deployed protections just to pass tests.

## Accessibility and visual review

Keyboard-only path: home -> catalog -> detail -> login -> request -> validation -> success -> edit/delete, then admin add/edit/remove. Visible focus at every step; no keyboard trap except controlled dialog containment. Use programmatic labels, meaningful headings/nav/main, link vs button semantics, text alternatives, field hints/errors, password visibility label, appropriately announced result/success/error. Screen-reader spot-check form and table/record interpretation. Automated axe check supplements human testing, not replaces it.

At each viewport inspect hero crop, tile name wrapping, search labels, input16px mobile, date field width, admin requester text, numerical alignment, dialog fit, scroll/focus behavior and sticky safe area. Capture representative screens with real fixture data but no tokens/contact details of real people. Match Figma tokens, measure major gaps/type hierarchy and fix source rather than patch individual screenshots.

Performance target (project goal, not instructor rubric): aim mobile Lighthouse performance>=85 and accessibility>=95 on a representative build; record actual run settings, not guaranteed scores. Prioritize core web usability: sized images/no large layout jumps, readable content before JS finishes, no unnecessary polling or font downloads. Test production build, not only dev server.

## Release checklist

- [ ] R01–R20 mapped to passing real-API evidence, including denied calls.
- [ ] Fresh clone/setup works from README; lockfile and supported runtime recorded.
- [ ] `npm run lint`, `npm run typecheck`, `npm test -- --runInBand`, `npm run build` pass using authored scripts; `npm run test:e2e` runs documented environment.
- [ ] No ignored TypeScript/build errors, console secret logs, hydration errors or dead controls.
- [ ] All CRUD success/failure/refresh paths and UTC/stock boundaries verified.
- [ ] Desktop/mobile keyboard/contrast/zoom and visual review completed.
- [ ] Asset/font licenses, env example, error handling, README and known limitations accurate.
- [ ] Figma and deck match actual implementation; native artifacts tracked independently.
- [ ] Deployment readiness and observed deployment results distinguished.
- [ ] Final Git diff reviewed for accidental source PDFs, credentials, generated bulk data and unrelated edits.

Defect severity: P0 exposed secrets/data corruption; P1 missing requirement/auth bypass/crashing primary flow; P2 usability/accessibility/responsive issue impairing task; P3 cosmetic. Resolve P0/P1 before claiming project complete. Document any outstanding P2 and user impact.
