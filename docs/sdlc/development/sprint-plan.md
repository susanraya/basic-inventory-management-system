# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up email/password authentication (register, login, logout, session expiry, equal full access for all signed-in staff) and let staff add the first products.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Create an account | 5 | backend-agent | — |
| US-002 | Story | Sign in with email and password | 5 | backend-agent | US-001 |
| US-003 | Story | Sign out and session expiry | 3 | backend-agent | US-002 |
| US-004 | Story | Equal full access for all users | 3 | backend-agent | US-002 |
| US-005 | Story | Add a product | 3 | backend-agent | US-004 |

## Sprint 2: Sprint 2

Deliver the full shared product table with search, edit, delete, stock quantity updates, and the low-stock visual warning.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-006 | Story | View all products in a searchable table | 5 | frontend-agent | US-004 |
| US-007 | Story | Search products by name | 3 | frontend-agent | US-006 |
| US-008 | Story | Edit product details | 3 | backend-agent | US-005, US-006 |
| US-009 | Story | Delete a product | 2 | backend-agent | US-006 |
| US-010 | Story | Update stock quantity | 3 | backend-agent | US-005, US-004 |
| US-011 | Story | See a low-stock visual warning | 2 | frontend-agent | US-006 |

## Sprint 3: Sprint 3

Make the whole app responsive and fully usable on desktop and mobile browsers.

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Use the app on desktop and mobile browsers | 5 | frontend-agent | US-006, US-005, US-008, US-010, US-011 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
