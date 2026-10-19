import { StatusPill } from '@/components/ui'
import { formatRelativeDate } from '@/utils/format'
import { Zap } from 'lucide-react'
import type { AlertRuleLastFiredProps } from './AlertRuleLastFiredProps'

/** When the rule last fired, or that it never has. */
export function AlertRuleLastFired({
  lastFiredAt,
}: Readonly<AlertRuleLastFiredProps>) {
  if (lastFiredAt === null) {
    return (
      <StatusPill tone="unknown" dot>
        Never fired
      </StatusPill>
    )
  }
  const when = formatRelativeDate(lastFiredAt)
  return (
    <StatusPill
      tone="warning"
      variant="solid"
      icon={<Zap />}
      title={new Date(lastFiredAt * 1000).toISOString()}
    >
      Last fired {when.relative}
      <span className="font-mono font-normal opacity-80">{when.absolute}</span>
    </StatusPill>
  )
}
