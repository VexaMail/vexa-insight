import type { DnsDiagnostics } from '@/types/diagnostics'
import { makeHealthyDnsDiagnostics } from './makeHealthyDnsDiagnostics'

/** A domain publishing none of the email authentication records. */
export function makeBrokenDnsDiagnostics(): DnsDiagnostics {
  return makeHealthyDnsDiagnostics({
    spf: null,
    spfValid: false,
    dmarc: null,
    dmarcPolicy: null,
    dmarcValid: false,
    dkimParsedRecords: [],
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
  })
}
