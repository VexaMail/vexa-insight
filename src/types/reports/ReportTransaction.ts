import type { getDb } from '@/lib/db'

/**
 * The synchronous transaction handle better-sqlite3 hands to a
 * `db.transaction` callback. Named so the ingest helpers can accept it.
 */
export type ReportTransaction = Parameters<
  Parameters<ReturnType<typeof getDb>['transaction']>[0]
>[0]
