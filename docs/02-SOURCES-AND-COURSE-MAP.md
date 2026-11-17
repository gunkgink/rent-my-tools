# Source evidence and course application

Local filenames and SHA-256 hashes are recorded in [source-inventory.md](source-inventory.md). PDF page numbers below are 1-based PDF pages. Text was extracted from all 14 current material PDFs; relevant implementation sections and the topic page were examined in detail. These are teaching examples for another rental domain, so adapt the concepts, not car-specific fields or sample credentials.

| Course file (filename prefix) | Relevant pages / topics | Application here |
|---|---|---|
| Class01_WebDevFundamentals | pp2–8 browser/server/rendering; pp18–38 semantic HTML/forms; pp39–56 CSS/box model | Server/client boundaries, accessible labels, nav, data tables, layout |
| Class02_JavaScriptTypeScript | pp11–35 arrays/control; pp57–75 TypeScript section | Typed entities, map/filter/sort, validation, no implicit any |
| Class03_ReactFramework | pp13–18 versions/setup; pp19–43 Next structure, pages, layouts and components | Next.js 16, TypeScript, App Router; composable page structure |
| Class04_Pages_Props_Style | pp1–45 pages, props, CSS Modules, Tailwind | Data-driven EquipmentCard, reusable props, scoped styling |
| Class05_Form_Interaction_Event | pp2–23 server/client rendering; pp24–43 events/forms, MUI inputs/date pickers | Small client form boundaries, explicit event handling and controlled fields |
| W06_ReactState | pp2–29 state, useState, reducer and input updates | Local form state; no mutation during render |
| W07_Router_Navigation | pp2–32 routes, links, dynamic segments and useRouter; remainder layout examples | Catalog/detail URLs, safe login return target, loading/error boundaries |
| W08_Hooks | pp15–32 useEffect; p33 context and following pages | Cleanup, race-safe requests when needed, stable providers; do not fetch everything in effects |
| W09_DataFetching | pp3–7 server/parallel fetching; pp15 onward cache; pp47–50 Suspense | Server-first reads, explicit cache policy, meaningful loading skeletons |
| W10_DataPosting | pp4–7,13–21 NextAuth 4.24.15/Credentials/session; pp34–42 JWT callbacks/bearer requests | Credentials against backend, typed JWT/session, authenticated server adapter |
| W11_Redux | pp2–9 actions/store/reducers/selectors; implementation examples afterward | One focused nonsecret rental-draft slice |
| W12_AdvancedReact | pp3–13 Redux Persist; pp14–35 Server Actions; pp36–39 responsive Tailwind | Browser-only safe persistence, API-backed actions, responsive layouts |
| W13_Testing | pp2–6 test levels/Jest/RTL; pp14–33 interaction/mocking examples | Boundary unit tests, behavior-based component tests |
| W14_TestingDeploy | pp18–34 Cypress; p23 SSR intercept caveat; p29 type separation; pp37–67 deployment | Real-API E2E and fixture distinction, separate test types, build/env/deployment proof |

## Lecture adaptations that must be deliberate

1. Class03 explicitly says Next 16 and demonstrates 16.3.0. Verify registry availability and compatibility at execution; select an available supported 16.x patch and lock it. Do not blindly copy the Node version in a historical slide.
2. W10 demonstrates NextAuth v4.24.15. Prefer that API family if compatible; prove credentials login/session/action access in an early spike. Do not mix Auth.js v5 code with v4 callbacks. Document an alternative only if evidence requires it.
3. W09 examples discuss automatic caching. Use explicit `cache: 'no-store'` for mutable equipment and authenticated data rather than assume a particular version's defaults.
4. W12 calls Server Actions experimental in historical examples. Do not carry obsolete experimental flags into Next 16. Use supported APIs for the installed version.
5. W12 directly accesses MongoDB in an example. Here the supplied API contains rental authorization and rules: Server Actions must call that API, never bypass it with direct database writes.
6. W10 logs session tokens for teaching. Do not reproduce token logging, shared sample secrets or sample passwords in source, console, tests or slides. Use module augmentation instead of the slide's `any` shortcut.
7. W14 p23: Cypress intercepts cannot stub server-side API requests. Use a separate stub API process or a real disposable backend for server-rendered flows.
8. W14 deployment examples mention wide Atlas access and various public config techniques. Keep secrets server-only; choose the narrowest supported access setup with the user. Do not silently change account/network permissions.
9. Teaching examples excluding tests from uploads are not a reason to omit this project's authored regression tests from its Git handoff. Exclude generated videos/reports, credentials, and dependencies instead.

## Backend evidence

Inspected 16 Nov 2026: [official backend](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent), commit `be18df9967be7e0a742b5a5ae25f07966dc4e1d4`.

- [README](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent/blob/be18df9967be7e0a742b5a5ae25f07966dc4e1d4/README.md): setup, semantics and routes.
- [Rental controller](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent/blob/be18df9967be7e0a742b5a5ae25f07966dc4e1d4/controllers/rentals.js): UTC dates, update behavior, stock validation, populated records, ownership.
- [Models](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent/tree/be18df9967be7e0a742b5a5ae25f07966dc4e1d4/models): required fields and constraints.
- [Auth middleware](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent/blob/be18df9967be7e0a742b5a5ae25f07966dc4e1d4/middleware/auth.js): bearer-only authentication; backend reads role from database.
- `routes/rentals.js`: only POST requires member; other methods require authentication plus controller ownership checks.
- `controllers/auth.js`: auth response token is `data.token`; logout clears backend cookie but does not revoke bearer JWT.
- `server.js`: CORS, 100 requests/IP/10 min, `/health` does not prove database readiness. Backend `npm test` only syntax-checks entrypoint.

## Current primary references

Consult versions at implementation time: [Next authentication](https://nextjs.org/docs/app/guides/authentication), [NextAuth v4 Credentials](https://next-auth.js.org/configuration/providers/credentials), [Redux with Next](https://redux.js.org/usage/nextjs), [Cypress best practices](https://docs.cypress.io/app/core-concepts/best-practices). These supplement lectures; the assignment and supplied API define domain behavior.
