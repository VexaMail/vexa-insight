/**
 * Errors a re-run of an already-applied statement produces: the object it
 * creates exists already, or the column it drops is already gone.
 */
export function isTolerableSqlError(stmt: string, err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  const isAlreadyExists =
    msg.includes('already exists') ||
    msg.includes('UNIQUE constraint') ||
    msg.includes('duplicate column name')

  const isDropMissingColumn =
    stmt.toLowerCase().includes('drop column') && msg.includes('no such column')

  return isAlreadyExists || isDropMissingColumn
}
