import type { DiagnosticsDnsSummary } from '@/services/ai'

/** Fully populated DNS summary of the AI diagnostics prompt input. */
export function makeDiagnosticsDnsSummary(
  overrides: Partial<DiagnosticsDnsSummary> = {},
): DiagnosticsDnsSummary {
  return {
    spfRecord: 'v=spf1 include:_spf.example.net ~all',
    spfValid: true,
    spfWarning: 'SPF ends with ~all instead of -all.',
    spfCategories: [
      {
        category: 'Syntax',
        checks: [{ name: 'single-record', passed: true, detail: 'ok' }],
      },
      {
        category: 'Limits',
        checks: [
          {
            name: 'lookup-count',
            passed: false,
            detail: '12 DNS lookups exceed the limit of 10',
          },
        ],
      },
    ],
    dmarcRecord: 'v=DMARC1; p=none; rua=mailto:dmarc@example.com',
    dmarcPolicy: 'none',
    dmarcValid: false,
    dmarcWarnings: ['Unknown tag `pxt`.'],
    dmarcTags: [
      { tag: 'p', value: 'none', description: 'Policy for the domain' },
    ],
    dkimSelectors: [
      {
        selector: 'selector1',
        valid: true,
        record: 'v=DKIM1; k=rsa; p=MIIB',
        keyType: 'rsa',
        keyLengthBits: 2048,
        publicKeyPresent: true,
        errors: [],
      },
      {
        selector: 'google',
        valid: false,
        record: null,
        keyType: null,
        keyLengthBits: null,
        publicKeyPresent: false,
        errors: ['no TXT record found'],
      },
    ],
    mxHosts: ['mx1.example.com'],
    aRecords: ['203.0.113.10'],
    nsRecords: ['ns1.example.net'],
    bimiRecord: 'v=BIMI1; l=https://example.com/logo.svg',
    bimiValid: true,
    bimiLogoUrl: 'https://example.com/logo.svg',
    bimiCertificateUrl: null,
    mtaStsRecord: 'v=STSv1; id=20240101',
    mtaStsValid: true,
    mtaStsPolicyAccessible: true,
    mtaStsMode: 'enforce',
    mtaStsMxRecords: ['mx1.example.com'],
    tlsRptRecord: 'v=TLSRPTv1; rua=mailto:tlsrpt@example.com',
    tlsRptValid: true,
    tlsRptRuaAddresses: ['mailto:tlsrpt@example.com'],
    ...overrides,
  }
}
