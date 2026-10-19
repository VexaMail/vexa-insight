import { IssueQueueEmpty, IssueQueueView } from '@/components/issues'
import { getIssueQueue } from '@/services/dashboard'
import type { IssuesDataProps } from '@/types/dashboard'
import { impactLabel } from '@/utils/dashboard'

/** Loads the issue queue for the date filter and renders it. */
export async function IssuesData({ input }: IssuesDataProps) {
  const { issues, rules } = await getIssueQueue(input)
  if (issues.length === 0) {
    return <IssueQueueEmpty windowLabel={rules.window.label} />
  }
  return (
    <IssueQueueView
      issues={issues}
      nowMs={input.now.getTime()}
      windowLabel={rules.window.label}
      impactLabel={impactLabel(rules.window)}
    />
  )
}
