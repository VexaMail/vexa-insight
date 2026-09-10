import crypto from 'node:crypto'

/** SHA-256 of a migration's SQL, recorded when it is applied. */
export function migrationChecksum(sql: string): string {
  return crypto.createHash('sha256').update(sql).digest('hex')
}
