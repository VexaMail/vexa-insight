import {
  domains,
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEventDkimResults,
  normalizedEventPolicyOverrides,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import { requireInsertedId } from './requireInsertedId'
import type { SeedReportSourcesResult } from './SeedReportSourcesResult'

/**
 * Seeds one raw report with two source IPs for `getReportSources` coverage.
 *
 * Shape chosen to pin the query's grouping and enrichment semantics:
 * - IP A (`203.0.113.10`, hostname enriched) has three events: two that share
 *   every grouped column (so they must collapse into one row) and one that
 *   differs on auth results and disposition (so it must stay separate).
 * - IP B (`198.51.100.20`, no hostname row) has a single event.
 * - Policy overrides and DKIM auth results are attached to a subset of events,
 *   including the second IP-A event but not the first, so "first event with a
 *   DKIM result wins" is actually exercised.
 */
export function seedReportSourcesFixture(now: Date): SeedReportSourcesResult {
  const db = getDb()
  const beginUnix = Math.floor(
    new Date('2026-07-01T00:00:00Z').getTime() / 1000,
  )
  const endUnix = Math.floor(new Date('2026-07-02T00:00:00Z').getTime() / 1000)

  const insertIp = (ip: string): number =>
    requireInsertedId(
      db
        .insert(ipAddresses)
        .values({
          ip,
          emailsSentCount: 0,
          firstSeenAt: now,
          lastSeenAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .returning({ id: ipAddresses.id })
        .all(),
      'ip_addresses',
    )

  const domainId = requireInsertedId(
    db
      .insert(domains)
      .values({
        name: 'example.com',
        createdAt: now,
        updatedAt: now,
        active: true,
      })
      .returning({ id: domains.id })
      .all(),
    'domains',
  )

  const rawReportId = requireInsertedId(
    db
      .insert(rawReports)
      .values({
        reportId: 'report-sources-fixture',
        orgName: 'test-org',
        beginDate: beginUnix,
        endDate: endUnix,
        rawXml: '<feedback/>',
        ingestedAt: now,
      })
      .returning({ id: rawReports.id })
      .all(),
    'raw_reports',
  )

  const ipAId = insertIp('203.0.113.10')
  const ipBId = insertIp('198.51.100.20')

  db.insert(ipHostnameEnrichments)
    .values({
      ip: '203.0.113.10',
      hostname: 'mail-a.example.net',
      lookupStatus: 'success',
      createdAt: now,
      updatedAt: now,
    })
    .run()

  const insertEvent = (
    ipAddressId: number,
    spfResult: string,
    dkimResult: string,
    aligned: boolean,
    disposition: string,
    count: number,
  ): number =>
    requireInsertedId(
      db
        .insert(normalizedEvents)
        .values({
          rawReportId,
          domainId,
          ipAddressId,
          spfResult,
          dkimResult,
          spfAuthResult: 'pass',
          spfAligned: aligned,
          dkimAligned: aligned,
          disposition,
          count,
          reportBeginDate: beginUnix,
          reportEndDate: endUnix,
          createdAt: now,
        })
        .returning({ id: normalizedEvents.id })
        .all(),
      'normalized_events',
    )

  const eventA1 = insertEvent(ipAId, 'pass', 'pass', true, 'none', 5)
  const eventA2 = insertEvent(ipAId, 'pass', 'pass', true, 'none', 3)
  const eventA3 = insertEvent(ipAId, 'fail', 'fail', false, 'quarantine', 2)
  const eventB1 = insertEvent(ipBId, 'pass', 'fail', false, 'none', 10)

  db.insert(normalizedEventPolicyOverrides)
    .values([
      { eventId: eventA2, type: 'forwarded', comment: null },
      { eventId: eventA3, type: 'mailing_list', comment: null },
      { eventId: eventB1, type: 'sampled_out', comment: null },
    ])
    .run()

  db.insert(normalizedEventDkimResults)
    .values([
      {
        eventId: eventA2,
        domain: 'a1.example.com',
        selector: 's1',
        result: 'pass',
        isAligned: true,
      },
      {
        eventId: eventA3,
        domain: 'a2.example.com',
        selector: 's2',
        result: 'fail',
        isAligned: false,
      },
      {
        eventId: eventB1,
        domain: 'b.example.com',
        selector: 'sb',
        result: 'fail',
        isAligned: false,
      },
    ])
    .run()

  return { rawReportId, eventIds: [eventA1, eventA2, eventA3, eventB1] }
}
