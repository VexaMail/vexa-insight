#!/usr/bin/env tsx
/**
 * Vexa Mail Insight - migration entrypoint.
 *
 * Usage:
 *   pnpm run db:migrate
 *
 * Applies every pending `drizzle/*.sql` file to the database named by
 * DATABASE_URL (default `file:./data/vexa.db`) through the same
 * `runMigrations()` the app calls at boot, so the CLI and the running app can
 * never disagree on what "migrated" means.
 */
import { runMigrations } from '@/lib/db'

export function main(): void {
  runMigrations()
  console.log('[db:migrate] Done.')
}

try {
  main()
} catch (error: unknown) {
  console.error('[db:migrate] Failed:', error)
  process.exit(1)
}
