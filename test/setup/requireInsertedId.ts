/**
 * Narrows the `.returning({ id })` result of a seed insert to a plain number.
 * Throws with the table name when the insert produced no row.
 */
export function requireInsertedId(
  rows: { id: number }[],
  table: string,
): number {
  const id = rows[0]?.id
  if (id == null) throw new Error(`insert into ${table} failed`)
  return id
}
