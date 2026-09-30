import { escapeCsvCell } from './escapeCsvCell'

/** Rows as CSV text with a header line, CRLF line endings (RFC 4180). */
export function toCsv<Row>(
  rows: readonly Row[],
  columns: readonly {
    header: string
    value: (row: Row) => string | number | null | undefined
  }[],
): string {
  const lines = [columns.map((c) => escapeCsvCell(c.header)).join(',')]
  for (const row of rows) {
    lines.push(columns.map((c) => escapeCsvCell(c.value(row))).join(','))
  }
  return `${lines.join('\r\n')}\r\n`
}
