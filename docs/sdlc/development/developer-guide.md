# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `c5c062f` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated inventory-management application with two parts in one repo: a Vite + React 19 SPA (frontend/) whose screens were reviewed and approved and currently run on seeded sample data, and a FastAPI backend (backend/) that is a bare scaffold exposing only a health check, with SQLAlchemy models and routers ready to be filled in. The backend defaults to a local SQLite file so it runs with no database server, while docker-compose provides a Postgres 16 container matching the approved stack for when real persistence is wired up.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm, Vite, React 19 tooling)
- Python 3.12
- pip
- Docker (optional, for the Postgres service via docker-compose)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (Optional) from the repo root run `docker compose up -d` to start the Postgres 16 database container
5. (Optional) set DATABASE_URL to point the backend at Postgres instead of the default SQLite file; set ALLOWED_ORIGINS on the backend and VITE_API_BASE_URL on the frontend when deploying
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally |
| backend dev | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI service with auto-reload; creates SQLite tables on startup and exposes GET /health |
| db up | `docker compose up -d` | Starts the Postgres 16 container defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend` | Vite + React 19 SPA; approved screens, UI/icon library, and the API client (src/lib/api.ts) that screens will be wired to |
| `frontend/src` | Application source: main.tsx entry, index.css, lib/ (api, icons, navigate, ui helpers) |
| `frontend/e2e` | Playwright end-to-end specs and support helpers |
| `backend` | FastAPI service scaffold: app entrypoint, database setup, models, schemas, routers, tests |
| `backend/app` | Application code: main.py (entrypoint, CORS, /health), database.py (engine/session), models.py (SQLAlchemy Base, no tables yet), schemas.py (Pydantic stub response), routers/ (empty, one router per component planned) |
| `backend/tests` | Pytest suite with unit/ and integration/ subfolders; includes a health check integration test |
| `.devcontainer` | Dev container configuration |
| `.quorq` | Platform handoff metadata |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routes are generated as typed stubs returning schemas.StubResponse until implemented, keeping the OpenAPI spec complete before behavior exists
- One router per architecture component that owns endpoints (backend/app/routers/)
- SQLAlchemy models all inherit from the shared Base in app/database.py; app/main.py imports models before create_all so tables register
- Backend session handling uses a request-scoped get_db dependency yielding one Session per request
- Frontend path alias '@/' maps to src/ (see tsconfig.json and vite.config.ts)
- Frontend component tests live beside the components they test and match src/**/*.{test,spec}.{ts,tsx}; Playwright e2e specs live in e2e/ separately
- API client (src/lib/api.ts) centralizes base URL, bearer auth (session token or shared secret), and fetch error handling for when screens are wired to the real backend
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the app; gate used by the platform during development |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit (not run by npm run build) |
| frontend e2e | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests; boots backend (uvicorn) and the built/previewed frontend automatically unless E2E_BASE_URL is set |
| frontend e2e browser install | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| backend tests | `cd backend && pytest` | Runs the pytest suite (unit and integration), including the health check test |
| backend lint | `cd backend && ruff check .` | Lints the backend code with Ruff |
| backend format | `cd backend && ruff format .` | Formats backend code with Ruff |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend build succeeds but the app fails type checks or deployment | Run `npm run typecheck` (tsc --noEmit) separately, since `npm run build` does not typecheck |
| Browser blocks API calls from the frontend with a CORS error | Set ALLOWED_ORIGINS on the backend to the frontend's origin (comma-separated); defaults only allow http://localhost:5173 and http://127.0.0.1:5173 |
| `pytest` run from backend/ fails with ModuleNotFoundError for app | Ensure pytest.ini's `pythonpath = .` is respected by running pytest from the backend/ directory |
| Playwright e2e run fails to boot the backend | Ensure backend dependencies are installed into backend/.venv (per playwright.config.ts) since the e2e webServer command invokes `.venv/bin/python -m uvicorn` |
| Need real persistence instead of the default SQLite file | Start Postgres with `docker compose up -d` and set DATABASE_URL to point at it before running the backend |
<!-- sdlc:auto:end troubleshooting -->
