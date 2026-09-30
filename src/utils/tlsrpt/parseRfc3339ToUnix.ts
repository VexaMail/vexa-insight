/** Parses an RFC 3339 date-time into Unix seconds; throws when invalid. */
export function parseRfc3339ToUnix(
  value: string | null,
  field: string,
): number {
  const ms = value === null ? Number.NaN : Date.parse(value)
  if (Number.isNaN(ms)) {
    throw new TypeError(`Invalid TLS-RPT ${field}: ${String(value)}`)
  }
  return Math.floor(ms / 1000)
}
