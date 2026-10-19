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
    id: `source:${row.ip}:${row.domainName}`,
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
