<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because Drives the single searchable product table with add/edit/delete/stock-update forms and instant client-side filtering; built as a Vite SPA served from its own origin and reading VITE_API_BASE_URL.

## Consequences

A SPA needs the separate bearer-token auth flow since it cannot share a cookie origin with the API, which the design already accounts for.
<!-- sdlc:auto:end adr -->