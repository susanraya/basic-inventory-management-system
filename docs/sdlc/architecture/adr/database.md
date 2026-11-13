<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Holds users, sessions and the shared product list; case-insensitive LIKE on an indexed name column handles search well into low thousands of rows.

## Consequences

Oversized for the data volume, but it is the approved default and leaves comfortable headroom.
<!-- sdlc:auto:end adr -->