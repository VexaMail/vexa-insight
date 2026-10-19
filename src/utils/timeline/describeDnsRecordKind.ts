/** `spf` -> `SPF`, `dkim:selector1` -> `DKIM selector1`, `mta_sts` -> `MTA-STS`. */
export function describeDnsRecordKind(recordKind: string): string {
  if (recordKind.startsWith('dkim:')) return `DKIM ${recordKind.slice(5)}`
  return recordKind.replace('_', '-').toUpperCase()
}
