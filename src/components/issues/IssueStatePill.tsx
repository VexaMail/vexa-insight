import { StatusPill } from '@/components/ui'
import { formatShortDate } from '@/utils/dashboard'
import { BellOff, Check } from 'lucide-react'
import type { IssueStatePillProps } from './IssueStatePillProps'

/** "Acknowledged" or "Snoozed until ..." with who did it; nothing if active. */
export function IssueStatePill({ issue }: Readonly<IssueStatePillProps>) {
  const by = issue.actedBy ? ` by ${issue.actedBy}` : ''
  if (issue.state === 'acknowledged') {
    return (
      <StatusPill tone="neutral" icon={<Check />} title={`Acknowledged${by}`}>
        Acknowledged
      </StatusPill>
    )
  }
  if (issue.state === 'snoozed' && issue.snoozedUntil !== null) {
    const until = formatShortDate(issue.snoozedUntil * 1000)
    return (
      <StatusPill tone="neutral" icon={<BellOff />} title={`Snoozed${by}`}>
        Snoozed until {until}
      </StatusPill>
    )
  }
  return null
}
