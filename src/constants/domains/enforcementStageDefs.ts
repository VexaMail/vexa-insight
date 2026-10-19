import type { EnforcementStage } from '@/types/domains'

/** The five steps of the enforcement guide, in order. */
export const ENFORCEMENT_STAGE_DEFS: readonly Omit<
  EnforcementStage,
  'state'
>[] = [
  {
    key: 'observe',
    label: 'Observe',
    hint: 'Publish p=none with rua= and collect a week of reports.',
  },
  {
    key: 'identify',
    label: 'Identify',
    hint: 'Name every source: own servers, services, forwarders, unknown.',
  },
  {
    key: 'fix',
    label: 'Fix',
    hint: 'Align SPF or DKIM for every legitimate sender that fails.',
  },
  {
    key: 'quarantine',
    label: 'Quarantine',
    hint: 'Publish p=quarantine, optionally with pct= to start gradually.',
  },
  {
    key: 'reject',
    label: 'Reject',
    hint: 'Publish p=reject once quarantine shows no legitimate losses.',
  },
]
