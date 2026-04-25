import type { DiagnosticsDnsSummary } from '../contracts/DiagnosticsDnsSummary'

/** Builds the DNS section for the diagnostics analysis prompt. */
export function buildDnsPromptSection(dns: DiagnosticsDnsSummary): string {
  const dkimValid = dns.dkimSelectors.filter((d) => d.valid)
  const dkimNotFound = dns.dkimSelectors.filter((d) => !d.valid)

  const dkimValidStr =
    dkimValid.length > 0
      ? dkimValid.map((d) => d.selector).join(', ')
      : 'none found'
  const dkimNotFoundStr =
    dkimNotFound.length > 0
      ? dkimNotFound.map((d) => d.selector).join(', ')
      : 'none'

  const mxSummary =
    dns.mxHosts.length > 0 ? dns.mxHosts.join(', ') : 'none found'
  const aRecordsSummary =
    dns.aRecords.length > 0 ? dns.aRecords.join(', ') : 'none found'
  const nsRecordsSummary =
    dns.nsRecords.length > 0 ? dns.nsRecords.join(', ') : 'none found'

  const dmarcWarningStr =
    dns.dmarcWarnings.length > 0
      ? `\n- DMARC validation errors: ${dns.dmarcWarnings.join('; ')}`
      : ''
  const dmarcTags =
    dns.dmarcTags.length > 0
      ? dns.dmarcTags
          .map((tag) => `${tag.tag} => ${tag.description}`)
          .join(' | ')
      : 'none'
  const bimiSummary = dns.bimiRecord
    ? `${dns.bimiRecord} (valid: ${dns.bimiValid}, logo: ${dns.bimiLogoUrl ?? 'none'}, certificate: ${dns.bimiCertificateUrl ?? 'none'})`
    : 'NOT CONFIGURED'
  const mtaStsSummary = dns.mtaStsRecord
    ? `${dns.mtaStsRecord} (valid: ${dns.mtaStsValid}, policy file accessible: ${dns.mtaStsPolicyAccessible}, mode: ${dns.mtaStsMode ?? 'unknown'}, policy mx: ${dns.mtaStsMxRecords.join(', ') || 'none'})`
    : 'NOT CONFIGURED'
  const tlsRptSummary = dns.tlsRptRecord
    ? `${dns.tlsRptRecord} (valid: ${dns.tlsRptValid}, rua: ${dns.tlsRptRuaAddresses.join(', ') || 'none'})`
    : 'NOT CONFIGURED'
  const spfCheckSummary = dns.spfCategories
    .map((category) => {
      const failed = category.checks
        .filter((check) => !check.passed)
        .map((check) => `${check.name}: ${check.detail}`)
      return failed.length > 0
        ? `${category.category}: ${failed.join(' | ')}`
        : `${category.category}: no issues`
    })
    .join('\n  - ')
  const dkimSummary = dns.dkimSelectors
    .map((selector) => {
      const parts = [
        `selector=${selector.selector}`,
        `valid=${selector.valid}`,
        `keyType=${selector.keyType ?? 'unknown'}`,
        `keyLengthBits=${selector.keyLengthBits ?? 'unknown'}`,
        `publicKeyPresent=${selector.publicKeyPresent}`,
      ]
      if (selector.errors.length > 0) {
        parts.push(`errors=${selector.errors.join(' / ')}`)
      }
      return parts.join(', ')
    })
    .join('\n  - ')

  return `DNS CONFIGURATION:
- SPF record: ${dns.spfRecord ?? 'NOT CONFIGURED'}
  - valid: ${dns.spfValid}${dns.spfWarning ? `\n  - warning: ${dns.spfWarning}` : ''}
  - SPF checks:
  - ${spfCheckSummary}
- DMARC record: ${dns.dmarcRecord ?? 'NOT CONFIGURED'}
  - policy: ${dns.dmarcPolicy ?? 'none'}
  - valid: ${dns.dmarcValid}${dmarcWarningStr}
  - parsed DMARC tags: ${dmarcTags}
- BIMI record: ${bimiSummary}
- MTA-STS record: ${mtaStsSummary}
- TLS-RPT record: ${tlsRptSummary}
- A records: ${aRecordsSummary}
- NS records: ${nsRecordsSummary}
- MX hosts: ${mxSummary}
- DKIM selectors with valid DNS records: ${dkimValidStr}
- DKIM common selectors probed but NOT found in DNS: ${dkimNotFoundStr}
- DKIM selector details:
  - ${dkimSummary}
  (NOTE: These are speculative probes of common selector names like google, selector1, etc. They do NOT indicate active sending failures. Only cross-reference with report DKIM pass/fail data to determine if missing selectors matter.)`
}
