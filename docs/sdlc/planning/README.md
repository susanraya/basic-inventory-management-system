# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Staff sign in with email and password to access the shared inventory; all signed-in users get equal, full access with no roles.

Goal: provide simple email/password authentication (self-serve or admin-invited account creation) as the only auth method (no SSO/MFA), with sign-out and session expiry, and equal full access for every signed-in staff member. Stories: US-001 (create account), US-002 (sign in), US-003 (sign out/session expiry), US-004 (equal full access for all users).

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: planning:EPIC-002

Staff manage a single shared product list with only name, price (USD), and quantity fields.

Goal: let staff add, view/search, edit, and delete products in one shared inventory for a single location at small data volume (hundreds to low thousands), with no SKU/category/supplier/image fields, no audit history, no multi-location support, and no spreadsheet import/export or external sync. Stories: US-005 (add product), US-006 (view all products in searchable table), US-007 (search by name), US-008 (edit product), US-009 (delete product).

**Related:** US-005, US-006, US-007, US-008, US-009

### EPIC-003 · approved · source: planning:EPIC-003

Staff update stock quantities and see an in-app visual warning when a product's quantity falls below a fixed threshold of 5.

Goal: support quantity updates and show a clear, non-configurable, in-app-only low-stock indicator (no email/SMS alerts) when quantity < 5; no stock-change audit history kept. Stories: US-010 (update stock quantity), US-011 (low-stock visual warning).

**Related:** US-010, US-011

### EPIC-004 · approved · source: planning:EPIC-004

Deliver the system as a responsive web application usable on both desktop and mobile browsers, with no native mobile app.

Goal: ensure the product list and forms adapt layout and remain fully usable on desktop and mobile browsers via the web, with mobile access only through a browser (no native app). Story: US-012 (use the app on desktop and mobile browsers).

**Related:** US-012

### SPRINT-1 · approved · source: planning:Sprint 1

First sprint stands up email/password authentication end to end and lets staff begin adding products.

Goal: Stand up email/password authentication (register, login, logout, session expiry, equal full access for all signed-in staff) and let staff add the first products. Capacity: 20 points. Items (by stated points/role): US-001 Create an account (5, backend-agent), US-002 Sign in with email and password (5, backend-agent), US-003 Sign out and session expiry (3, backend-agent), US-004 Equal full access for all users (3, backend-agent), US-005 Add a product (3, backend-agent) -- totaling 19 of 20 points. EPIC-001 is listed as an unassigned, unpointed parent item alongside these stories.

**Related:** EPIC-001, US-001, US-002, US-003, US-004, US-005

### SPRINT-2 · approved · source: planning:Sprint 2

Second sprint completes the shared product table with search, edit, delete, stock updates, and the low-stock warning.

Goal: Deliver the full shared product table with search, edit, delete, stock quantity updates, and the low-stock visual warning. Capacity: 20 points. Items (by stated points/role): US-006 View all products in a searchable table (5, frontend-agent), US-007 Search products by name (3, frontend-agent), US-008 Edit product details (3, backend-agent), US-009 Delete a product (2, backend-agent), US-010 Update stock quantity (3, backend-agent), US-011 See a low-stock visual warning (2, frontend-agent) -- totaling 18 of 20 points. EPIC-002 and EPIC-003 are listed as unassigned, unpointed parent items alongside these stories.

**Related:** US-006, US-007, US-008, US-009, US-010, US-011

### SPRINT-3 · approved · source: planning:Sprint 3

Third sprint makes the whole application responsive across desktop and mobile browsers.

Goal: Make the whole app responsive and fully usable on desktop and mobile browsers. Capacity: 20 points. Items (by stated points/role): US-012 Use the app on desktop and mobile browsers (5, frontend-agent) -- totaling 5 of 20 points. EPIC-004 is listed as an unassigned, unpointed parent item alongside this story.

**Related:** EPIC-004, US-012
<!-- sdlc:auto:end narrative -->
