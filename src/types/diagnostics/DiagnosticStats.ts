export type DiagnosticStats = {
  totalEvents: number
  failedEvents: number

  // Alignment issues (denominator: all events or all passing auth)
  spf_pass_unaligned: number
  dkim_pass_unaligned: number

  // Auth failures (denominator: failed auth events)
  spf_auth_fail: number // Catch-all for failed SPF
  spf_permerror: number
  spf_temperror: number
  spf_softfail: number

  dkim_all_fail: number // Catch-all for failed DKIM

  // Policy Overrides (denominator: failed events that were overridden)
  dmarc_override_forwarded: number
  dmarc_override_local_policy: number
}
