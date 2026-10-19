import type {
  DiagnosticsFindingBase,
  DnsDiagnostics,
} from '@/types/diagnostics'

/** Observed is the first valid key, else the first published record. */
export function dkimFindingBase(dns: DnsDiagnostics): DiagnosticsFindingBase {
  const records = dns.dkimParsedRecords
  const shown =
    records.find((record) => record.valid) ??
    records.find((record) => record.raw !== null)
  return {
    id: 'dkim',
    protocol: 'DKIM',
    check: 'DKIM selectors',
    observed: shown?.raw ?? null,
    section: 'dkim',
  }
}
