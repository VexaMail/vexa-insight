import type { ActionItem, SourcePeriodRow } from '@/types/dashboard'
import { formatCount } from './formatters/formatCount'
import { isNewlyFailingSource } from './isNewlyFailingSource'
import { sourceHref } from './sourceHref'

/** Queues every IP that started failing DMARC for a domain this period. */
export function newFailingSourceActions(
  rows: SourcePeriodRow[],
  hasPrevious: boolean,
): ActionItem[] {
  if (!hasPrevious) return []
  return rows.filter(isNewlyFailingSource).map((row) => ({
    // Issue keys are `<kind>:<domain>[:<detail>]`, so the domain comes first.
    id: `source:${row.domainName}:${row.ip}`,
    severity: 'warning',
    subject: row.ip,
    issue: 'New failing source',
    detail: `${formatCount(row.currentFailed)} of ${formatCount(row.currentTotal)} messages for ${row.domainName} fail DMARC`,
    impactMessages: row.currentFailed,
    lastSeenAt: row.lastFailedAt,
    isNew: true,
    href: sourceHref(row.ip),
  }))
}
