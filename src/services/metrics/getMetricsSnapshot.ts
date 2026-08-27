import {
  domains,
  getDb,
  ipAddresses,
  jobRuns,
  normalizedEvents,
  pollStatus,
  rawReports,
} from '@/lib/db'
import type { MetricsSnapshot } from '@/types/metrics'
import { count, desc, eq } from 'drizzle-orm'

export async function getMetricsSnapshot(): Promise<MetricsSnapshot> {
  const db = getDb()

  const domainsRow = db.select({ value: count() }).from(domains).get()
  const ipsRow = db.select({ value: count() }).from(ipAddresses).get()
  const reportsRow = db.select({ value: count() }).from(rawReports).get()
  const eventsRow = db.select({ value: count() }).from(normalizedEvents).get()

  const bySpfAuthRows = db
    .select({
      spfAuthResult: normalizedEvents.spfAuthResult,
      value: count(),
    })
    .from(normalizedEvents)
    .groupBy(normalizedEvents.spfAuthResult)
    .all()

  const byDispositionRows = db
    .select({
      disposition: normalizedEvents.disposition,
      value: count(),
    })
    .from(normalizedEvents)
    .groupBy(normalizedEvents.disposition)
    .all()

  const pollRow = db
    .select({
      isRunning: pollStatus.isRunning,
      lastCheck: pollStatus.lastCheck,
    })
    .from(pollStatus)
    .where(eq(pollStatus.id, 1))
    .get()

  const lastRunRow = db
    .select({
      processed: jobRuns.processed,
      errorCount: jobRuns.errorCount,
    })
    .from(jobRuns)
    .orderBy(desc(jobRuns.runAt))
    .limit(1)
    .get()

  const eventsBySpfAuth: Record<string, number> = {}
  for (const row of bySpfAuthRows) {
    eventsBySpfAuth[row.spfAuthResult] = row.value
  }
  const eventsByDisposition: Record<string, number> = {}
  for (const row of byDispositionRows) {
    eventsByDisposition[row.disposition] = row.value
  }

  return {
    domainsTotal: domainsRow?.value ?? 0,
    ipAddressesTotal: ipsRow?.value ?? 0,
    rawReportsTotal: reportsRow?.value ?? 0,
    normalizedEventsTotal: eventsRow?.value ?? 0,
    eventsBySpfAuth,
    eventsByDisposition,
    ingestLastRunTimestampSeconds: pollRow?.lastCheck
      ? Math.floor(pollRow.lastCheck.getTime() / 1000)
      : null,
    ingestIsRunning: pollRow?.isRunning ? 1 : 0,
    ingestLastSuccessTotal: lastRunRow?.processed ?? 0,
    ingestLastErrorCount: lastRunRow?.errorCount ?? 0,
  }
}
