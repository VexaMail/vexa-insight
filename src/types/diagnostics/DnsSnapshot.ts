import type { DnsDiagnostics } from './DnsDiagnostics'

/** A DNS run and the time it was made. */
export type DnsSnapshot = {
  readonly dns: DnsDiagnostics
  readonly checkedAt: string
}
