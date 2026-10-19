import { toMailtoList } from './toMailtoList'

/**
 * The `_smtp._tls` TXT value. Addresses starting with `https://` are kept as
 * HTTPS report endpoints; anything else becomes a `mailto:`.
 */
export function buildTlsRptRecord(destinations: readonly string[]): string {
  const rua = destinations
    .map((destination) => destination.trim())
    .filter((destination) => destination.length > 0)
    .map((destination) =>
      destination.toLowerCase().startsWith('https://')
        ? destination
        : toMailtoList([destination]),
    )
    .join(',')
  return `v=TLSRPTv1; rua=${rua}`
}
