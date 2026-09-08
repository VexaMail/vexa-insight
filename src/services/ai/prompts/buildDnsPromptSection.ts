import type { DiagnosticsDnsSummary } from '../contracts/DiagnosticsDnsSummary'
import { formatBimiSummary } from './dnsSection/formatters/formatBimiSummary'
import { formatDkimSelectorDetails } from './dnsSection/formatters/formatDkimSelectorDetails'
import { formatDkimSelectorNames } from './dnsSection/formatters/formatDkimSelectorNames'
import { formatDmarcTags } from './dnsSection/formatters/formatDmarcTags'
import { formatDmarcWarnings } from './dnsSection/formatters/formatDmarcWarnings'
import { formatListOrNoneFound } from './dnsSection/formatters/formatListOrNoneFound'
import { formatMtaStsSummary } from './dnsSection/formatters/formatMtaStsSummary'
import { formatSpfCheckSummary } from './dnsSection/formatters/formatSpfCheckSummary'
import { formatTlsRptSummary } from './dnsSection/formatters/formatTlsRptSummary'
import { noneFoundLabel } from './dnsSection/noneFoundLabel'
import { notConfiguredLabel } from './dnsSection/notConfiguredLabel'

/** Builds the DNS section for the diagnostics analysis prompt. */
export function buildDnsPromptSection(dns: DiagnosticsDnsSummary): string {
  const dkimValid = dns.dkimSelectors.filter((selector) => selector.valid)
  const dkimNotFound = dns.dkimSelectors.filter((selector) => !selector.valid)

  return `DNS CONFIGURATION:
- SPF record: ${dns.spfRecord ?? notConfiguredLabel}
  - valid: ${String(dns.spfValid)}${dns.spfWarning ? `\n  - warning: ${dns.spfWarning}` : ''}
  - SPF checks:
  - ${formatSpfCheckSummary(dns)}
- DMARC record: ${dns.dmarcRecord ?? notConfiguredLabel}
  - policy: ${dns.dmarcPolicy ?? 'none'}
  - valid: ${String(dns.dmarcValid)}${formatDmarcWarnings(dns)}
  - parsed DMARC tags: ${formatDmarcTags(dns)}
- BIMI record: ${formatBimiSummary(dns)}
- MTA-STS record: ${formatMtaStsSummary(dns)}
- TLS-RPT record: ${formatTlsRptSummary(dns)}
- A records: ${formatListOrNoneFound(dns.aRecords)}
- NS records: ${formatListOrNoneFound(dns.nsRecords)}
- MX hosts: ${formatListOrNoneFound(dns.mxHosts)}
- DKIM selectors with valid DNS records: ${formatDkimSelectorNames(dkimValid, noneFoundLabel)}
- DKIM common selectors probed but NOT found in DNS: ${formatDkimSelectorNames(dkimNotFound, 'none')}
- DKIM selector details:
  - ${formatDkimSelectorDetails(dns)}
  (NOTE: These are speculative probes of common selector names like google, selector1, etc. They do NOT indicate active sending failures. Only cross-reference with report DKIM pass/fail data to determine if missing selectors matter.)`
}
