# Development and deployment runbook

Use Node24 LTS (or compatible supported Node>=22.13). The machine's original Node20.11 can run Next but is below the installed Cypress/Jest tooling requirement. Use a supported runtime for installation and verification. Do not force peer dependencies.

## Reproduce a local environment

```powershell
npm ci
# Copy .env.example to .env.local and replace NEXTAUTH_SECRET with a generated secret.
npm run backend:setup
npm run backend:dev
# Second terminal:
npm run dev
```

`backend:setup` clones the pinned course backend into ignored `runtime/backend` and installs its locked dependencies. The local launcher uses mongodb-memory-server (real MongoDB binary, downloaded on first run), sets a unique temporary database and a freshly generated backend JWT secret, then seeds synthetic inventory/accounts. This process is disposable: data disappears when stopped. It never connects to a user-provided or production database. Login email addresses are admin@example.test, alex@example.test and sam@example.test. Their generated local password is in ignored `runtime/local-accounts.json`. Do not reuse these accounts outside local testing.

During this session the already-inspected backend at `../tmp/backend-reference` is used as fallback. A fresh checkout should use `backend:setup` first. Backend source remains separate; do not copy its bundled secret into frontend configuration. Tests are destructive only to test-created records in this disposable database.

For a persistent development backend, start a separately configured supplied API with a dedicated MongoDB URI and set frontend BACKEND_URL to its origin. The frontend never needs MONGO_URI or backend JWT_SECRET.

## Verify

```powershell
npm run typecheck
npm run lint
npm test
npm run build
# While frontend and disposable backend are running:
npm run test:api
npm run test:e2e
```

Backend enforces100 requests/IP/10min. Repeated browser tests can exhaust it. Stop/restart only the disposable backend to reset a local test window, then rerun with the new synthetic credentials file. Do not loosen deployed limits. API and browser suites together should run once per fresh seed window; avoid parallel bursts. Cypress cannot intercept SSR API traffic; these suites use the actual local API and database.

## Deployment preparation

Frontend env: BACKEND_URL (origin only), NEXTAUTH_URL (canonical HTTPS frontend URL), NEXTAUTH_SECRET (unique random secret in provider secret storage). No NEXT_PUBLIC secret. Build with npm ci and npm run build; serve using a supported Next hosting runtime. Configure backend FRONTEND_URL to actual frontend origin, Mongo URI and a unique JWT secret on the backend host only. Confirm the selected host supports the supplied long-running Express server or use its documented adapter; do not assume a historical serverless example applies unchanged.

Before release: clean build/tests, review dependency audits, HTTPS cookies/login/session/action checks, equipment data and persistent create/edit/delete, admin permissions, no broad database network permission changes, environment placeholders removed. `/health` alone does not prove a database connection. Record actual URLs only after deployment. No remote deployment, Git push or publication has been performed.

Rollback: redeploy last known-good frontend revision. Preserve database backups before persistent seed/schema changes; no schema changes are needed by this frontend. Do not reset a shared database to repair a UI problem.
