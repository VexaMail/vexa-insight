import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'

/** Normalises the aggregate row of getIpDomains into the UI shape. */
export function toIpRelatedDomainRow(row: {
  domainId: number
  domain: string
  messageCount: number
  firstSeenAt: number | null
  lastSeenAt: number | null
}): IpRelatedDomainRow {
  return {
    domainId: row.domainId,
    domain: row.domain,
    messageCount: row.messageCount,
    firstSeenAt: row.firstSeenAt ? row.firstSeenAt : null,
    lastSeenAt: row.lastSeenAt ? row.lastSeenAt : null,
  }
}
