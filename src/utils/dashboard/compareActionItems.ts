import type { ActionItem } from '@/types/dashboard'
import { severityRank } from './severityRank'

/** Queue order: severity, then messages affected, then most recent. */
export function compareActionItems(a: ActionItem, b: ActionItem): number {
  const bySeverity = severityRank(a.severity) - severityRank(b.severity)
  if (bySeverity !== 0) return bySeverity
  const byImpact = (b.impactMessages ?? 0) - (a.impactMessages ?? 0)
  if (byImpact !== 0) return byImpact
  return (b.lastSeenAt ?? 0) - (a.lastSeenAt ?? 0)
}
