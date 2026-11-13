# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-STACK · approved · source: requirements:technology-stack

Product owner approved a fixed technology stack: FastAPI backend, AWS cloud, PostgreSQL database, React frontend. Design must use exactly these, no substitutions.

- Backend: FastAPI 0.115 -- covers the small fixed set of operations (login, list/search, create, edit, delete, adjust quantity) with little code; platform default; pairs with React over JSON API; fast enough for hundreds to low-thousands of products.
- Cloud: AWS -- platform default for hosting, database and backups in one place; light usage keeps cost near the bottom of AWS pricing.
- Database: PostgreSQL 16 -- handful of simple tables (products, user accounts); reliable, fast name search at this scale, keeps all users seeing the same shared inventory; platform default, oversized for data volume so no risk of outgrowing it.
- Frontend: React 19 -- one responsive screen (searchable product table with add/edit/delete/stock-update actions plus low-stock flag); platform default; supports instant client-side filtering as staff type in the search box.

### REQ-SCOPE · approved · source: requirements:scope

Defines what the delivery lightweight scope includes and explicitly excludes.

In scope: shared product list in a searchable table; add a product (name, price, quantity); update stock quantity; edit product details; delete a product; search products by name; low-stock visual warning below 5; staff login to access inventory; self-serve or admin-invited account creation; email/password login (no SSO or MFA); price stored in USD as an informational attribute only; responsive web app for desktop and mobile; single shared inventory for one location.
Out of scope -- not to be designed or built: spreadsheet import/export (CSV/Excel); sync with POS, accounting or e-commerce systems.

### REQ-FEAT-SIGNIN · approved · source: requirements:features:sign-in-accounts

Functional requirements for staff account creation, sign-in, sign-out, and equal access.

- Create an account: self-registration or admin invitation with email and password; duplicate emails rejected with a clear message; only valid, unused emails and passwords meeting stated rules create accounts.
- Sign in with email and password: only authentication method, no SSO/MFA; successful sign-in goes to the product list.
- Sign out and session end: staff can sign out, and sessions also end on expiry; user must sign in again afterward to view or change products.
- Equal access for all staff: every signed-in staff member has the same full access to add, view, search, edit, delete and update stock, with no role-based restrictions.

### REQ-FEAT-PRODUCTLIST · approved · source: requirements:features:product-list

Functional requirements for viewing, searching, adding, editing and deleting products in the shared table.

- View all products: shared table shows name, price (USD), quantity; empty-state message invites adding a product when none exist.
- Search products by name: partial-name filtering; no-matches message when nothing matches; clearing search restores full list.
- Add a product: fields are name, price (USD), quantity only; blank name, negative price, or negative/non-whole quantity rejected with a corrective message.
- Edit product details: change name, price or quantity; same validation rules as add, with corrective message on invalid input.
- Delete a product: requires confirmation; cancelling leaves the product unchanged; confirming removes it from the shared list.

### REQ-FEAT-STOCK · approved · source: requirements:features:stock-levels

Functional requirements for updating stock quantities and showing a low-stock warning.

- Update stock quantity: must be a whole number of zero or more; negative or non-whole values rejected with a message stating the rule.
- Low-stock warning: quantity below 5 shows a clear visual indicator; quantity 5 or more shows none; threshold fixed at below 5; in-app visual only, no email/SMS alerts, not configurable.

### REQ-FEAT-MOBILE · approved · source: requirements:features:mobile-desktop

Functional requirement that the app works fully on both desktop and mobile browsers.

- Use on desktop and mobile: product list and forms are usable through a desktop or mobile web browser, with layout fitting the screen and all actions usable. Browser-only access; no native mobile app.

### NFR-001 · approved · source: requirements:NFR-001

Security: passwords must be stored only in hashed form.

Account passwords are stored only in hashed form and are never stored or shown in plain text.

### NFR-002 · approved · source: requirements:NFR-002

Security: sign-in failure messages must not reveal which field was wrong.

When a sign-in attempt fails, the error message does not reveal whether the email or the password was wrong.

### NFR-003 · approved · source: requirements:NFR-003

Security: sessions must end on sign-out and on expiry.

A signed-in session ends when the user signs out and when it expires, after which the user must sign in again before viewing or changing any products.

### NFR-004 · approved · source: requirements:NFR-004

Security: inventory data is visible only to signed-in staff.

Only signed-in staff can view or change products; anyone not signed in is redirected to sign in and cannot see or alter any inventory data.

### NFR-005 · approved · source: requirements:NFR-005

Scalability: the product table must remain usable at up to low thousands of products.

The product table loads and remains usable when the shared inventory holds up to low thousands of products. Target: up to low thousands of products.

### NFR-006 · approved · source: requirements:NFR-006

Compatibility: responsive layout must work on desktop and mobile browsers.

The app is a responsive web application whose layout adapts to desktop and mobile browser screens, keeping all actions usable on each.

### NFR-007 · approved · source: requirements:NFR-007

Security (accepted risk): no SSO or multi-factor authentication offered.

Sign-in is deliberately limited to email and password, with no single sign-on or multi-factor authentication offered. This is an accepted risk, not a defect.

### NFR-008 · approved · source: requirements:NFR-008

Maintainability (accepted risk): no stock-change history is kept.

Only the current quantity of each product is stored; previous values and stock-change history are deliberately not recorded. This is an accepted risk, not a defect.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-13

**Capabilities in scope:** Shared product list in a searchable table, Add a product (name, price, quantity), Update stock quantity, Edit product details, Delete a product, Search products by name, Low-stock visual warning when quantity falls below 5, Staff login to access the inventory, Self-serve or admin-invited account creation, Email and password login, no SSO or MFA, Price stored in USD as an informational attribute only, Responsive web app for desktop and mobile browsers, Single shared inventory for one location

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The app does a small, fixed set of operations — log in, list/search products, create, edit, delete, adjust quantity. FastAPI covers these with little code, pairs naturally with the React front end over a simple JSON API, and is the platform default. For hundreds to low-thousands of products and a small team, it is more than fast enough. |
| cloud | AWS | A standalone web app for a small team needs somewhere dependable to run with room to grow, and AWS is the platform default that covers hosting, the database and backups in one place. Your usage is light, so you will sit near the bottom of its pricing and only pay for the small footprint you actually use. |
| database | PostgreSQL | You have one shared product list with name, price and quantity, plus user accounts — a handful of simple tables. PostgreSQL stores this reliably, searches product names quickly at your scale, and keeps every user seeing the same shared inventory. It is the platform default and comfortably oversized for your data volume, which means you will not outgrow it. |
| frontend | React | Your staff need one responsive screen that works on desktop and phone browsers: a searchable product table with add, edit, delete and stock-update actions, plus a visual low-stock flag. React handles exactly this kind of interactive table-and-form screen well and is the platform default, so your team can type in the search box and see the list filter instantly without page reloads. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Staff Access & Authentication

Staff sign in with email and password to access the shared inventory. All users have equal, full access. Account creation is simple (self-serve or admin-invited). Assumption: login is email + password with no SSO or MFA; this is the only authentication method in scope.

### US-001: Create an account

**Priority:** high

> As a new staff member, I want to create an account using my email and a password, either by self-registering or by accepting an admin invitation, so that I can get access to the shared inventory.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the account creation screen | I submit a valid, unused email address and a password that meets the stated requirements | my account is created and I can sign in with those credentials |
| AC-002 | I am creating an account | I submit an email address that already has an account | the account is not created and I am told the email is already in use |
| AC-003 | an account is being created | the password is stored | it is stored in hashed form and never stored or displayed in plain text |

### US-002: Sign in with email and password

**Priority:** critical

> As a staff member, I want to sign in with my email and password, so that I can view and manage the inventory.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have a valid account | I enter my correct email and password | I am signed in and taken to the product list |
| AC-005 | I am on the sign-in screen | I enter an incorrect email or password | I am not signed in and I see an error that does not reveal which field was wrong |
| AC-006 | there is no SSO or MFA option (assumption) | I view the sign-in screen | the only way to authenticate is email and password |

### US-003: Sign out and session expiry

**Priority:** high

> As a signed-in staff member, I want my session to end when I sign out or after it expires, so that my access cannot be used by someone else on a shared device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I am signed in | I choose to sign out | my session ends and I must sign in again to access the inventory |
| AC-008 | I am signed in | my session has expired | I am required to sign in again before I can view or change any products |

### US-004: Equal full access for all users

**Priority:** medium

> As a staff member, I want the same full access as every other user, so that any of us can add, edit, delete and update stock without role restrictions.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I am any signed-in staff member | I use the inventory | I can add, view, search, edit, delete products and update stock with no role-based restrictions |
| AC-010 | I am not signed in | I try to access any product screen | I am redirected to sign in and cannot see or change any products |

## EPIC-002: Product Management

Staff manage a single shared product list. A product has only a name, a price in USD, and a quantity — no SKU, category, supplier, or image (assumption). Price is an informational attribute only and is never used for payments, billing, or checkout (assumption). The list is a single shared inventory for one location with small data volume (hundreds to low thousands of products); no audit history or multi-location support (assumption). Spreadsheet import/export and sync with external systems are out of scope.

### US-005: Add a product

**Priority:** critical

> As a staff member, I want to add a product with a name, price in USD, and quantity, so that it appears in the shared inventory.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I am on the add-product form | I enter a name, a price, and a quantity and save | the product is added to the shared list and shown in the product table |
| AC-012 | I am adding a product | I leave the name blank, or enter a negative price, or enter a negative or non-whole quantity | the product is not saved and I see a message explaining what to fix |
| AC-013 | the product form (assumption) | I view the available fields | only name, price (USD) and quantity are available — there is no SKU, category, supplier or image field |

### US-006: View all products in a searchable table

**Priority:** high

> As a staff member, I want to see all products in a table, so that I can review the whole inventory at a glance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | products exist in the shared inventory | I open the product list | I see all products in a table showing name, price formatted as USD, and quantity |
| AC-015 | no products have been added yet | I open the product list | I see an empty-state message inviting me to add a product |
| AC-016 | the inventory holds up to low thousands of products (assumption) | I open the product list | the table loads and remains usable |

### US-007: Search products by name

**Priority:** high

> As a staff member, I want to search products by name, so that I can quickly find a specific product.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | I am viewing the product table | I type part of a product name into the search | the table shows only products whose name matches the search text |
| AC-018 | I have entered a search term | no product names match | I see a message indicating no matching products were found |
| AC-019 | I have an active search | I clear the search text | the full product list is shown again |

### US-008: Edit product details

**Priority:** high

> As a staff member, I want to edit a product's name, price, and quantity, so that I can keep its details accurate.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | a product exists | I open it for editing, change the name, price, or quantity, and save | the updated details are stored and shown in the product table |
| AC-021 | I am editing a product | I enter an invalid value (blank name, negative price, or negative/non-whole quantity) | the changes are not saved and I see a message explaining what to fix |

### US-009: Delete a product

**Priority:** medium

> As a staff member, I want to delete a product, so that the inventory no longer lists items we no longer carry.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | a product exists | I delete it and confirm | the product is removed from the shared list and no longer appears in the table |
| AC-023 | I choose to delete a product | I am asked to confirm | the product is only removed after I confirm, and remains unchanged if I cancel |

## EPIC-003: Stock Management & Low-Stock Warning

Staff update stock quantities and the table shows a visual low-stock warning when a product's quantity falls below 5. The threshold is fixed at below 5 and the warning is an in-app visual indicator only — there are no email or SMS alerts (assumption). No stock-change audit history is kept (assumption).

### US-010: Update stock quantity

**Priority:** critical

> As a staff member, I want to update the quantity of a product, so that stock levels reflect what we actually have.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | a product exists | I set its quantity to a valid whole number of zero or more and save | the new quantity is stored and shown in the product table |
| AC-025 | I am updating a quantity | I enter a negative or non-whole value | the change is not saved and I see a message explaining the quantity must be a whole number of zero or more |
| AC-026 | no audit history is kept (assumption) | I update a quantity | only the current quantity is stored and there is no record of previous values |

### US-011: See a low-stock visual warning

**Priority:** high

> As a staff member, I want a visual warning on products whose quantity is below 5, so that I know which items need restocking.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | a product's quantity is below 5 | I view it in the product table | it shows a clear visual low-stock indicator |
| AC-028 | a product's quantity is 5 or more | I view it in the product table | no low-stock indicator is shown |
| AC-029 | the warning is in-app only and the threshold is fixed at below 5 (assumption) | a product becomes low on stock | the indicator appears only in the app with no email or SMS alert, and the threshold cannot be configured |

## EPIC-004: Responsive Web Platform

The system is delivered as a responsive web application usable on desktop and mobile browsers. There is no native mobile app (assumption).

### US-012: Use the app on desktop and mobile browsers

**Priority:** medium

> As a staff member, I want the app to work in both desktop and mobile browsers, so that I can manage inventory from whatever device I have.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I open the app in a desktop browser | I use the product list and forms | the layout fits the screen and all actions are usable |
| AC-031 | I open the app in a mobile browser | I use the product list and forms | the layout adapts to the smaller screen and all actions remain usable |
| AC-032 | there is no native mobile app (assumption) | I want to use the system on mobile | I access it through a mobile web browser |
<!-- sdlc:auto:end epics -->
