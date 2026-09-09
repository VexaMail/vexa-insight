import type { DnsDiagnostics } from './DnsDiagnostics'

/** The DMARC fields of the diagnostics, derived from the _dmarc TXT record. */
export type DmarcSummary = Pick<
  DnsDiagnostics,
  'dmarc' | 'dmarcPolicy' | 'dmarcValid' | 'dmarcWarnings' | 'dmarcTags'
>
