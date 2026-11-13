# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Staff sign in with email and password to access the shared inventory, with equal full access for everyone and simple account creation.

Login is email + password only, with no SSO or MFA, as the sole authentication method in scope. Account creation can be self-serve or admin-invited.

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: planning:EPIC-002

Staff manage a single shared product list, where each product has only a name, a USD price, and a quantity.

Price is informational only, never used for payments, billing, or checkout. No SKU, category, supplier, or image fields. Single shared inventory for one location at small data volume (hundreds to low thousands); no audit history or multi-location support. Spreadsheet import/export and external system sync are out of scope.

**Related:** US-005, US-006, US-007, US-008, US-009

### EPIC-003 · approved · source: planning:EPIC-003

Staff update stock quantities and see a visual low-stock warning when a product's quantity falls below 5.

Threshold is fixed at below 5; warning is an in-app visual indicator only, with no email/SMS alerts and no configuration. No stock-change audit history is kept.

**Related:** US-010, US-011

### EPIC-004 · approved · source: planning:EPIC-004

The system is delivered as a responsive web application usable on desktop and mobile browsers.

There is no native mobile app; access is only via mobile or desktop web browser.

**Related:** US-012
<!-- sdlc:auto:end narrative -->
