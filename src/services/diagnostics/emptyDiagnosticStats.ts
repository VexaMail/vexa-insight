import type { DiagnosticStats } from '@/types/diagnostics'

/** Every counter at zero: the stats of a domain with no events in range. */
export const emptyDiagnosticStats: DiagnosticStats = {
  totalEvents: 0,
  failedEvents: 0,
  spf_pass_unaligned: 0,
  dkim_pass_unaligned: 0,
  spf_auth_fail: 0,
  spf_permerror: 0,
  spf_temperror: 0,
  spf_softfail: 0,
  dkim_all_fail: 0,
  dmarc_override_forwarded: 0,
  dmarc_override_local_policy: 0,
}
