import type { DnsDiagnostics } from '@/types/diagnostics'
import { makeDnsDiagnostics } from './makeDnsDiagnostics'

/**
 * A `DnsDiagnostics` with nothing configured — the baseline for scoring tests,
 * where every protocol must start absent so each override's contribution is
 * measured on its own.
 */
export function makeEmptyDnsDiagnostics(
  overrides: Partial<DnsDiagnostics> = {},
): DnsDiagnostics {
  return makeDnsDiagnostics({
    spf: null,
    spfValid: false,
    dmarc: null,
    dmarcPolicy: null,
    dmarcValid: false,
    ...overrides,
  })
}
