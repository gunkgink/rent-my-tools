# Rent My Tools

Course Project 2: Equipment Rental System.

**Current status:** implemented local Next.js frontend with the supplied backend, disposable development MongoDB, member/admin flows, automated tests, and design/presentation sources. Native Figma and external deployment remain separate pending deliverables.

## Run locally

Use Node24 LTS or another supported runtime >=22.13.

```powershell
npm ci
# Create .env.local from .env.example; generate a unique NEXTAUTH_SECRET.
npm run backend:setup
npm run backend:dev
# In another terminal:
npm run dev
```

Open [the local application](http://localhost:3000). Synthetic login details are generated in `runtime/local-accounts.json` (ignored by Git). The disposable database resets when its backend process stops. See [the runbook](docs/DEPLOYMENT.md) for persistent backend configuration, tests, rate limits and deployment preparation.

Implemented: public equipment browse/search/filter/detail; registration including role; Credentials login/logout; server-side bearer authentication; member request create/view/edit/delete; admin equipment CRUD and all-user request management; strict UTC date/quantity limits; nonsecret session-scoped request drafts; responsive layouts and original category art. Requests do not reserve inventory. Price estimates are illustrative, not collected payments.

Checks: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`; with local services running, `npm run test:api` and `npm run test:e2e`. Real API and browser evidence is recorded under `docs/evidence` and the execution log; inspect current results rather than assume every planned scenario has run.

Design inputs: [Figma handoff and importable foundations](docs/figma/README.md). Presentation: [editable Markdown deck](docs/presentation/DECK.md) and [local HTML slide view](docs/presentation/deck.html). The signed-in Figma file now contains editable flows, foundations, six screen frames and a member prototype; see its handoff README. Local slide sources are not a final PowerPoint attachment.

Start with [the handoff index](docs/00-START-HERE.md). It links requirements, course evidence, visual design, screens, Figma instructions, API contract, architecture, implementation phases, tests and presentation planning.

Coding agents must read [AGENTS.md](AGENTS.md) and the [local delivery skill](.agents/skills/rent-my-tools-delivery/SKILL.md). A repository-local copy of [frontend-design](.agents/skills/frontend-design/SKILL.md) is included with its license so the design workflow travels with the repository.

For the next agent, use [NEXT-AGENT-PROMPT.md](NEXT-AGENT-PROMPT.md). Progress and verification belong in [the execution log](docs/12-EXECUTION-LOG.md).

The application uses the supplied [Project 2 backend](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent), pinned by the setup script. No credentials belong in this repository. See [asset licenses](docs/ASSET-LICENSES.md) for font and illustration attribution.

