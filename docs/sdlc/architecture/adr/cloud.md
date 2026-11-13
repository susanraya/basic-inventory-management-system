<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because S3/CloudFront for the SPA, ECS Fargate for the API and RDS for PostgreSQL with managed backups and encryption, all at light usage.

## Consequences

More moving parts than a single PaaS, but keeps hosting, database and backups in one managed place.
<!-- sdlc:auto:end adr -->