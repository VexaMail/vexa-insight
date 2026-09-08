import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

import { dnsAdminGuideRules } from './dnsAdminGuides/dnsAdminGuideRules'

export function createDnsAdminGuides(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide[] {
  return dnsAdminGuideRules
    .filter((rule) => rule.applies(dns))
    .map((rule) => rule.build(dns))
}
