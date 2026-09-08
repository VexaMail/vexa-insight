import type { DnsDiagnostics } from '@/types/diagnostics'

/**
 * A domain with every protocol correctly configured. Pass overrides to break
 * exactly one of them.
 */
export function makeHealthyDnsDiagnostics(
  overrides: Partial<DnsDiagnostics> = {},
): DnsDiagnostics {
  return {
    domain: 'example.com',
    txtRecords: [],
    spf: 'v=spf1 include:_spf.example.net -all',
    spfValid: true,
    spfWarning: null,
    spfValidationCategories: [],
    spfTree: null,
    dmarc: 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com',
    dmarcPolicy: 'reject',
    dmarcValid: true,
    dmarcWarnings: [],
    dmarcTags: [],
    dkim: [],
    dkimParsedRecords: [
      {
        selector: 'selector1',
        raw: 'v=DKIM1; k=rsa; p=MIIB',
        valid: true,
        version: 'DKIM1',
        keyType: 'rsa',
        keyLengthBits: 2048,
        publicKeyPresent: true,
        errors: [],
      },
    ],
    mx: [{ priority: 10, exchange: 'mx1.example.com' }],
    bimi: {
      raw: 'v=BIMI1; l=https://example.com/logo.svg',
      valid: true,
      logoUrl: 'https://example.com/logo.svg',
      certificateUrl: null,
    },
    mtaSts: {
      raw: 'v=STSv1; id=20240101',
      valid: true,
      policyFileAccessible: true,
      policyHost: 'mta-sts.example.com',
      mode: 'enforce',
      fileAge: null,
      mxRecords: ['mx1.example.com'],
    },
    tlsRpt: {
      raw: 'v=TLSRPTv1; rua=mailto:tlsrpt@example.com',
      valid: true,
      ruaAddresses: ['mailto:tlsrpt@example.com'],
    },
    aRecords: ['203.0.113.10'],
    nsRecords: ['ns1.example.net'],
    ...overrides,
  }
}
