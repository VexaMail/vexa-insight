import type { DnsDiagnostics } from '@/types/diagnostics'

/**
 * Builds a fully-populated, healthy `DnsDiagnostics` for component tests.
 * Pass overrides to exercise a specific protocol's failure path.
 */
export function makeDnsDiagnostics(
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
    dkimParsedRecords: [],
    mx: [],
    bimi: { raw: null, valid: false, logoUrl: null, certificateUrl: null },
    mtaSts: {
      raw: null,
      valid: false,
      policyFileAccessible: false,
      policyHost: null,
      mode: null,
      fileAge: null,
      mxRecords: [],
    },
    tlsRpt: { raw: null, valid: false, ruaAddresses: [] },
    aRecords: [],
    nsRecords: [],
    ...overrides,
  }
}
