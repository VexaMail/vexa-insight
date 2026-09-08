import type { DiagnosticStats } from '@/types/diagnostics'

/** Traffic with no failure ratio high enough to raise a guide. */
export function makeQuietDiagnosticStats(
  overrides: Partial<DiagnosticStats> = {},
): DiagnosticStats {
  return {
    totalEvents: 100,
    failedEvents: 20,
    spf_pass_unaligned: 0,
    dkim_pass_unaligned: 0,
    spf_auth_fail: 0,
    spf_permerror: 0,
    spf_temperror: 0,
    spf_softfail: 0,
    dkim_all_fail: 0,
    dmarc_override_forwarded: 0,
    dmarc_override_local_policy: 0,
    ...overrides,
  }
}
