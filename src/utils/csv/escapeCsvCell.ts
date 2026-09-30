/**
 * One CSV cell (RFC 4180): quoted when it holds a comma, quote or line
 * break. A value starting with `=`, `+`, `-`, `@`, tab or carriage return is
 * prefixed with `'` so a spreadsheet does not evaluate it as a formula; report
 * contents such as hostnames come from third parties.
 */
export function escapeCsvCell(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) return ''
  let text = String(value)
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}
