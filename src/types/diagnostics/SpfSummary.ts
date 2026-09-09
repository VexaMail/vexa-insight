import type { DnsDiagnostics } from './DnsDiagnostics'

/** The SPF fields of the diagnostics, derived from the apex TXT records. */
export type SpfSummary = Pick<
  DnsDiagnostics,
  'spf' | 'spfValid' | 'spfWarning' | 'spfValidationCategories'
>
