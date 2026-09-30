import { normalizeSndsKey } from './normalizeSndsKey'
import { splitSndsCsvLine } from './splitSndsCsvLine'

/**
 * Turns an SNDS CSV report into records keyed by the given column names. A
 * header row, should SNDS ever send one, is recognised by its first cell and
 * skipped.
 */
export function parseSndsCsv(
  text: string,
  columns: readonly string[],
): Record<string, string>[] {
  const header = normalizeSndsKey(columns[0] ?? '')
  const records: Record<string, string>[] = []
  for (const line of text.split(/\r?\n/)) {
    if (line.trim() === '') continue
    const cells = splitSndsCsvLine(line)
    if (normalizeSndsKey(cells[0] ?? '') === header) continue
    records.push(
      Object.fromEntries(
        columns.map((column, i) => [column, cells[i]?.trim() ?? '']),
      ),
    )
  }
  return records
}
