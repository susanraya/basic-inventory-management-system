<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django REST Framework
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Serves the small fixed JSON API (auth plus product CRUD and stock update) with Pydantic validation covering the name/price/quantity rules.

## Consequences

Minimal framework means auth and session handling are assembled from small pieces rather than provided, which suits this narrow scope.
<!-- sdlc:auto:end adr -->