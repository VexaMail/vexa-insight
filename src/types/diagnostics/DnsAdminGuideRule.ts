import type { DiagnosticsAdminGuide } from './DiagnosticsAdminGuide'
import type { DnsDiagnostics } from './DnsDiagnostics'

/**
 * One conditional entry of the DNS admin-guide catalogue: `applies` decides
 * whether the finding is present, `build` renders the guide for the domain.
 */
export type DnsAdminGuideRule = {
  applies: (dns: DnsDiagnostics) => boolean
  build: (dns: DnsDiagnostics) => DiagnosticsAdminGuide
}
