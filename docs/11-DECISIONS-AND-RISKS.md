# Decisions, assumptions and open inputs

Status recorded at planning handoff. Defaults permit independent work; ask only when the missing input actually affects dependent work. User can revise any proposed design choice; update Figma/code/docs together.

| ID | Decision / assumption | Status and consequence |
|---|---|---|
| D01 | Equipment-library identity with broad categories; brand Rent My Tools | Proposed design, grounded in topic; not construction-only |
| D02 | English UI; Thai names/text render correctly | Default; ask before full translation work |
| D03 | Currency THB; rate per item/day | THB assumed from course context; backend has numeric rate but no currency |
| D04 | Estimate uses max(1,dateDifference) days | UI-only assumption; same-day price not defined; must be labeled estimate, no billing |
| D05 | Next16, TypeScript, NextAuth4, Redux/Persist, Jest/RTL/Cypress | Course-aligned choices; compatibility gate required |
| D06 | Backend token remains server-side | Intentional improvement over slide session-token exposure; helper must be spiked |
| D07 | Server Actions forward to supplied API | No direct frontend Mongo; preserve supplied authorization/validation |
| D08 | Registration includes both roles | Required educational behavior. Do not silently remove admin option; discuss production restriction separately |
| D09 | UTC dates and return-start <=7 | Verified source semantics; no inclusive-duration rewrite |
| D10 | No approval/reservation/payment/overlap restriction | Verified; avoid misleading controls/statuses |
| D11 | CSS Modules + global tokens, native form controls | Supported teaching approach; Tailwind/MUI optional, no duplicate styling systems |
| D12 | New-request draft only, sessionStorage, clear account change | Demonstrates Redux/Persist without storing credentials or private records |
| D13 | Product images local manifest/category fallback | Backend has no media field; new equipment cannot upload photos by default |
| D14 | Native Figma and presentation are future execution deliverables | Current task supplies detailed Markdown specifications, not native files |

## Open inputs and how to proceed

- **Submission/presentation announcement:** now supplied and reviewed; document13 records official dates, weights, ordered journey and required attachments. Team roster and booked slot remain unknown.
- **Development MongoDB / backend URL:** needed for real integration. Prefer a disposable local MongoDB if installed/available; otherwise ask for configured development service access without asking the user to paste secrets into public docs. UI/fixture work can proceed, but integration cannot be marked passed.
- **Figma destination/access:** destination now supplied (document13); browser login completed and native edits saved; connector disabled by administrator, native download permission declined. No Figma connector was assumed in this plan. Request intended file/team or use user-approved browser workflow. Finish local specs while pending.
- **Preferred language, currency and same-day billing display:** defaults D02–D04 are reversible. Confirm before presenting prices as more than estimates. No payment handling in scope.
- **Hosting and deployment permission:** prepare locally; obtain actual service/account targets and publication authorization before external release.
- **Photos/fonts:** original or licensed sources preferred; use local category art until available. Record license before shipping. No additional skill is necessary for this Markdown plan; future native artifacts can use appropriate available presentation/Figma tooling.

## Material and source limits

There are14 current PDFs in `../material/`. Earlier downloads included Orientation and AI Assist Reminder, but these were not present in the folder at this review and were not used to infer AI-use rules. Request any instructor AI/disclosure policy before final submission; do not claim compliance with an unseen policy. The topic PDF is6 pages; Project2 is page3. Backend inspected at pinned commit; recheck if the team changes it. Source PDF extraction may omit diagram/code-image details; read rendered original pages when implementing a pictured example rather than reconstruct code from broken text.

## Risks and mitigation

| Risk | Impact | Mitigation / owner |
|---|---|---|
| Next/NextAuth/React version mismatch | Auth/build blocked | Gate0 compatibility proof; delivery lead |
| NextAuth helper leaks backend token | Credential exposure | Server-only helper, storage/session/HTML review; builder + reviewer |
| Dates validated in local timezone | Rule mismatch near midnight | Strict UTC helper, frozen clock cases; reviewer |
| Historical request edits fail | User cannot save apparently valid changes | Explicit past-start warning + revised date/equipment path; builder |
| Deactivated equipment disappears | History crashes or edits impossible | Null/inactive handling, replacement selection, retain view/delete |
| Fake approval/status UI | Functional scope diverges | Domain invariants in AGENTS and screen review |
| Server fetches share IP rate limit |429 demo/test failures | Avoid polling, pace integration, isolated test config |
| SSR mocking mistaken for integration | False confidence | Separate stub and real-API result labels |
| Currency/total unsupported | Misleading cost promise | Visible estimate and no payment/total mutation fields |
| Missing native artifact access | Figma/deck incomplete | Track independent states, prepare local handoff, request exact access |
| Course packaging differs from plan | Submission gaps | Reconcile actual announcement before final hand-in |

No task requires modifying unrelated machine/global agent configuration. All new project-specific instructions and skills are local to this repository. Do not change remote origin, use production data or publish externally just because the execution plan includes eventual release.
