# Database migrations policy

Vexa runs SQL migrations from `drizzle/*.sql` at boot via `runMigrations()`
(see [lib/db/runMigrations.ts](../lib/db/runMigrations.ts)). Once a release
ships, a migration may run against thousands of self-hosted instances that
the project never sees again, so every migration must be **reversible
without operator intervention** and **safe to roll back to the previous app
release** that did not yet know about it.

This document is the contract. Pull requests that change `drizzle/**.sql`
must pass the rules below; `scripts/check-migrations.sh` enforces a subset
of them automatically and runs in `pnpm run check:ci`.

## Hard rules

1. **No `DROP TABLE`, `DROP COLUMN`, `DROP INDEX`, `RENAME COLUMN`,
   `RENAME TABLE` in a single release.** Use the expand-and-contract pattern
   below.
2. **No `ALTER COLUMN ... NOT NULL`** unless every row already has a value
   AND a `DEFAULT` is supplied at the same time.
3. **No data-loss SQL** (e.g. `DELETE FROM` without a `WHERE`, `TRUNCATE`,
   `UPDATE ... SET col = NULL` over a populated column).
4. **Migration files are append-only.** Once a numbered file is merged to
   `main`, do not edit it; add a new file instead. The runner records
   applied filenames in `__drizzle_migrations` and will reject a content
   change.
5. **One logical change per file.** A bug in step 3 of a 5-step migration
   leaves the DB half-applied; smaller files limit the blast radius.

If you genuinely need to break one of the above (e.g. removing a table
that has been deprecated for two releases), prefix the migration with the
acknowledgement comment exactly:

```sql
-- ACK-DESTRUCTIVE: <one-line reason>
```

The check script will then allow it. The comment must appear on its own
line within the first 5 lines of the file. Reviewers should still push
back: an acknowledged destructive migration is a one-way door for
operators on the old release.

## Expand-and-contract pattern

To rename `users.password_hash` to `users.credential_hash` safely:

- **Release N — expand.** Add a new column `credential_hash`, backfill it
  from `password_hash`, and start writing to both. The old column stays.
- **Release N+1 — read from new.** Code reads from `credential_hash` and
  ignores `password_hash`. Operators who are still on release N keep
  working because both columns are populated.
- **Release N+2 — contract.** Drop `password_hash` with the
  `ACK-DESTRUCTIVE` comment. Operators on release N cannot upgrade
  directly to N+2; document this in the release notes.

The same pattern applies to splitting columns, changing types, or
moving rows between tables.

## Checklist for every migration PR

- [ ] One logical change per file.
- [ ] `pnpm run db:generate` produced the file (or it is a hand-written
      SQL file under `drizzle/` and the test in
      [test/migrationSmoke.test.ts](../test/migrationSmoke.test.ts) still
      passes).
- [ ] `scripts/check-migrations.sh` passes locally.
- [ ] If destructive: `-- ACK-DESTRUCTIVE: <reason>` comment present and
      the previous release shipped the matching deprecation step.
- [ ] Index changes (`CREATE INDEX`) use `IF NOT EXISTS` so a re-run
      against a partially-migrated DB does not fail.
- [ ] Backfills are idempotent (re-running on already-migrated rows is a
      no-op).
- [ ] Release notes mention the migration if it changes the operator
      contract (new env var, longer boot time, new permission, etc.).

## CI enforcement

`scripts/check-migrations.sh` greps every staged `drizzle/*.sql` for
banned patterns and fails the build when one is found without the
acknowledgement comment. It runs as part of `pnpm run check:ci`. See the
script for the exact rules and how to extend them.
