# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Create an account | US-001 | 1 | POST /auth/register, api, db, spa, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Sign in with email and password | US-002 | 1 | POST /auth/login, api, db, sessions, spa, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Sign out and session expiry | US-003 | 1 | POST /auth/logout, api, db, sessions | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-001 | Equal full access for all users | US-004 | 1 | GET /auth/me, api, sessions, spa, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-002 | Add a product | US-005 | 1 | POST /products, api, db, products, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | View all products in a searchable table | US-006 | 2 | GET /products, api, db, products, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-007 | EPIC-002 | Search products by name | US-007 | 2 | GET /products, api, products, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-002 | Edit product details | US-008 | 2 | PUT /products/{id}, api, db, products, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-002 | Delete a product | US-009 | 2 | DELETE /products/{id}, api, db, products, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-003 | Update stock quantity | US-010 | 2 | PATCH /products/{id}/quantity, api, db, products, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-011 | EPIC-003 | See a low-stock visual warning | US-011 | 2 | GET /products, products, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-012 | EPIC-004 | Use the app on desktop and mobile browsers | US-012 | 3 | spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
<!-- sdlc:auto:end matrix -->
