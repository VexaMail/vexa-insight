import { listDnsHistory } from '@/services/dns-history'
import { listDomainIssueEvents } from '@/services/issues'
import { listSourceReviews } from '@/services/source-reviews'
import type { DomainHealthTimeline, TimelineEvent } from '@/types/timeline'
import {
  dnsChangeToTimelineEvent,
  issueEventToTimelineEvent,
} from '@/utils/timeline'
import { getComplianceDays } from './getComplianceDays'
import { getNewSourceEvents } from './getNewSourceEvents'

/**
 * A domain's daily DMARC results with what changed around them: DNS record
 * changes, sources seen for the first time, operator verdicts and issue
 * actions, so a drop
 * can be read next to its likely cause.
 */
export async function getDomainHealthTimeline(
  domainName: string,
  days: number,
  nowMs = Date.now(),
): Promise<DomainHealthTimeline> {
  const since = Math.floor(nowMs / 1000) - days * 86_400
  const [compliance, dns, newSources, reviews, actions] = await Promise.all([
    getComplianceDays(domainName, since),
    listDnsHistory(domainName),
    getNewSourceEvents(domainName, since),
    listSourceReviews({ domainName }),
    listDomainIssueEvents(domainName),
  ])
  const events: TimelineEvent[] = [
    ...dns.map((entry) => dnsChangeToTimelineEvent(entry, domainName)),
    ...newSources,
    ...reviews.map((review) => ({
      at: review.reviewedAt,
      kind: 'source_review' as const,
      title: `Source marked ${review.verdict}`,
      detail: review.note ? `${review.ip}: ${review.note}` : review.ip,
      href: `/ips/${encodeURIComponent(review.ip)}`,
    })),
    ...actions.map(issueEventToTimelineEvent),
  ]
  return {
    domain: domainName,
    days: compliance,
    events: events
      .filter((event) => event.at >= since)
      .sort((a, b) => b.at - a.at),
  }
}
