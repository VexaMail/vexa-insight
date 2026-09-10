import { getDatabaseUrl } from '@/lib/config'
import { resolveDbFilePath } from '@/lib/db'
import Database from 'better-sqlite3'

/**
 * Writes a consistent snapshot of the live database to `destination` and
 * returns the path it wrote.
 *
 * `cp` is not a backup here. The connections the app holds run in WAL mode, so
 * rows that are committed and durable can still live only in the `-wal` file;
 * a copy of the main database file alone silently loses them, and the loss
 * only shows up when someone restores it. `VACUUM INTO` asks SQLite itself for
 * the snapshot, which is exactly the guarantee the online-backup API gives.
 *
 * The source path comes from the configured database URL, so an install that
 * moved its database somewhere other than `data/vexa.db` is backed up too.
 */
export function createDatabaseSnapshot(destination: string): string {
  const source = resolveDbFilePath(getDatabaseUrl())
  const sqlite = new Database(source, { readonly: true })
  try {
    sqlite.prepare('VACUUM INTO ?').run(destination)
  } finally {
    sqlite.close()
  }
  return destination
}
