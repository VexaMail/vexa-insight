#!/usr/bin/env tsx
/**
 * Vexa Mail Insight - database snapshot entrypoint.
 *
 * Usage:
 *   npx tsx scripts/backup-db.ts [destination]
 *
 * Writes a consistent copy of the database named by DATABASE_URL. With no
 * argument the snapshot lands beside the database as
 * `<database>.backup.<UTC timestamp>`. Prints the path it wrote, which is what
 * `self-update.sh` reads.
 */
import { getDatabaseUrl } from '@/lib/config'
import { resolveDbFilePath } from '@/lib/db'
import { createDatabaseSnapshot } from '@/services/backup'

export function main(argv: string[]): void {
  const stamp = new Date().toISOString().replaceAll(/[:-]|\.\d+/g, '')
  const fallback = `${resolveDbFilePath(getDatabaseUrl())}.backup.${stamp}`
  console.log(createDatabaseSnapshot(argv[0] ?? fallback))
}

try {
  main(process.argv.slice(2))
} catch (error: unknown) {
  console.error(
    '[backup-db] Failed:',
    error instanceof Error ? error.message : error,
  )
  process.exit(1)
}
