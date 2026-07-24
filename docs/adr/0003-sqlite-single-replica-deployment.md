# ADR 0003: SQLite with a single-replica deployment topology

Date: 2026-05-19

## Status

Accepted (per-process cache decision reaffirmed 2026-07-24)

## Context

Vexa Insight Dashboard is self-hosted DMARC observability for a single team.
Data volume is modest (aggregate reports, normalized events, settings) and the
write path is a single ingestion pipeline. Operators want a one-container
deployment with no external database service. SQLite (via Drizzle and
better-sqlite3) satisfies this but is single-writer, which constrains
horizontal scaling.

Diagnostics DNS lookups (SPF, DKIM, DMARC, BIMI, MTA-STS, TLS-RPT, A, NS) are
cached in a per-process in-memory TTL map
(`services/diagnostics/withDiagnosticsCache.ts`, 5-minute TTL keyed on
`globalThis`). Whether that cache is "sufficient" only becomes a question if
multiple replicas each resolve DNS independently.

## Decision

- Use SQLite on a persistent volume as the only datastore.
- Pin the deployment to one replica everywhere: `deploy/k8s/deployment.yaml`
  sets `replicas: 1`, the Helm chart defaults `replicaCount: 1` with an
  explicit comment ("SQLite enforces single-writer; do not raise replicas
  without moving DB"), and the PVC is `ReadWriteOnce`.
- Keep `withDiagnosticsCache` as a per-process in-memory cache. With exactly
  one replica, a shared cache (Redis or similar) would add an external
  dependency for zero benefit. This closes the open question "decide whether
  the per-process withDiagnosticsCache is sufficient": it is, as long as the
  single-replica topology holds.
- Revisit both decisions together if multi-replica deployment ever ships;
  that change would require moving off SQLite (or to a networked SQLite) and
  a shared or replicated diagnostics cache.

## Consequences

- Zero-dependency persistence: backup is a file copy; the web installer can
  create the database on first boot.
- No horizontal scaling and a brief downtime window on redeploys (the k8s
  deployment cannot run two pods against the same RWO volume).
- Each process re-resolves DNS at most once per record type per domain per
  5 minutes, which is well within resolver etiquette for one replica.

## Alternatives considered

- PostgreSQL: rejected for the target audience; it turns "run one container"
  into "run and operate a database server".
- Multi-replica with a shared cache and networked DB: rejected as premature;
  no current deployment needs more than one replica.
