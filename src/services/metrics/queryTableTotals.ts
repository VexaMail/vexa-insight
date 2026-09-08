import {
  domains,
  getDb,
  ipAddresses,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import type { MetricsTableTotals } from '@/types/metrics'
import { count } from 'drizzle-orm'

/** Row count of each table the metrics endpoint exposes. */
export function queryTableTotals(): MetricsTableTotals {
  const db = getDb()

  return {
    domainsTotal: db.select({ value: count() }).from(domains).get()?.value ?? 0,
    ipAddressesTotal:
      db.select({ value: count() }).from(ipAddresses).get()?.value ?? 0,
    rawReportsTotal:
      db.select({ value: count() }).from(rawReports).get()?.value ?? 0,
    normalizedEventsTotal:
      db.select({ value: count() }).from(normalizedEvents).get()?.value ?? 0,
  }
}
