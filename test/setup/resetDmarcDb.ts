import {
  domains,
  getDb,
  ipAddresses,
  normalizedEventDkimResults,
  normalizedEventPolicyOverrides,
  normalizedEvents,
  rawReports,
} from '@/lib/db'

/**
 * Deletes rows in FK-respecting order between tests in the same file.
 * The schema itself is preserved; only data is wiped. Children first, then
 * parents (raw_reports, domains, ip_addresses are referenced by normalized_events).
 */
export function resetDmarcDb(): void {
  const db = getDb()
  db.delete(normalizedEventDkimResults).run()
  db.delete(normalizedEventPolicyOverrides).run()
  db.delete(normalizedEvents).run()
  db.delete(rawReports).run()
  db.delete(domains).run()
  db.delete(ipAddresses).run()
}
