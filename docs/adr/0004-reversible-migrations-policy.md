# ADR 0004: Reversible-migrations policy enforced in CI

Date: 2026-05-19

## Status

Accepted

## Context

Migrations run automatically at boot (`lib/db/runMigrations.ts`) on
self-hosted instances the project never sees again. A destructive migration
that ships in a release can break thousands of installations with no way to
assist recovery, and rolling back the app to a release that predates the
migration must remain safe.

## Decision

- Document the contract in `docs/MIGRATIONS.md`: no drops of tables, columns,
  or indexes and no renames in a single release (use expand-and-contract), no
  `NOT NULL` tightening without a default, no data-loss SQL, append-only
  migration files, one logical change per file.
- Enforce the mechanical subset in CI: `scripts/check-migrations.sh` scans
  `drizzle/*.sql` for banned patterns (`DROP TABLE`, `DROP COLUMN`,
  `DROP INDEX`, `RENAME TO`, `RENAME COLUMN`, `ALTER COLUMN ... NOT NULL`,
  `TRUNCATE`) and fails `pnpm run check:ci` on a match.
- Allow deliberate exceptions via an acknowledgement comment
  (`-- ACK-DESTRUCTIVE: <reason>`) in the first 5 lines of the file, subject
  to review. Three pre-policy migrations are grandfathered in the script
  because Drizzle hashes migration file content and editing them would break
  upgrades on live instances.

## Consequences

- Destructive schema changes cannot land silently; they require an explicit,
  reviewable acknowledgement.
- Schema removals take two releases (expand, then contract), which is the
  intended cost.
- The script only catches pattern-matchable violations; semantic data-loss
  SQL still relies on review and the documented contract.

## Alternatives considered

- Down-migrations: rejected; Drizzle's SQLite flow is forward-only and
  auto-run at boot, so "reversible" is achieved by making forward migrations
  non-destructive rather than by shipping down scripts.
- Review-only policy without CI: rejected; the gate exists precisely because
  review alone misses these.
