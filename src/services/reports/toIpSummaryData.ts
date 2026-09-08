import type { IpDetailRow, IpSummaryData } from '@/types/ips'
import { computeRate } from '@/utils/ips'

/** Maps one aggregated IP row onto the summary the detail page renders. */
export function toIpSummaryData(row: IpDetailRow): IpSummaryData {
  const totalMessages = Number(row.totalMessages)

  return {
    ip: row.ip,
    countryCode: row.countryCode,
    hostname: row.hostname,
    hostnameLastLookupAt: row.hostnameLastLookupAt
      ? Math.floor(row.hostnameLastLookupAt.getTime() / 1000)
      : null,
    totalMessages,
    emailsSentCount: row.emailsSentCount,
    firstSeen: row.firstSeen ? row.firstSeen : null,
    lastSeen: row.lastSeen ? row.lastSeen : null,
    spfPassCount: row.spfPassCount,
    dkimPassCount: row.dkimPassCount,
    fullyAlignedCount: row.fullyAlignedCount,
    spfPassRate: computeRate(row.spfPassCount, totalMessages),
    dkimPassRate: computeRate(row.dkimPassCount, totalMessages),
    fullyAlignedRate: computeRate(row.fullyAlignedCount, totalMessages),
    dispositionNone: row.dispositionNone,
    dispositionQuarantine: row.dispositionQuarantine,
    dispositionReject: row.dispositionReject,
  }
}
