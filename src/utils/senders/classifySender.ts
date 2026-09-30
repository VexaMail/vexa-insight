import { SENDER_CATALOG } from '@/constants/senders'
import type { SenderCatalogEntry, SenderIdentity } from '@/types/senders'
import { findCatalogEntry } from './findCatalogEntry'

/**
 * Names the service behind a source from its reverse DNS hostname, else from
 * the domains that DKIM-signed its mail. The hostname wins because a branded
 * DKIM domain is the customer's own, while the PTR belongs to the sender.
 */
export function classifySender(
  source: { hostname?: string | null; dkimDomains?: readonly string[] },
  catalog: readonly SenderCatalogEntry[] = SENDER_CATALOG,
): SenderIdentity | null {
  if (source.hostname) {
    const entry = findCatalogEntry(catalog, source.hostname)
    if (entry) {
      return {
        name: entry.name,
        category: entry.category,
        matchedOn: 'hostname',
      }
    }
  }
  for (const domain of source.dkimDomains ?? []) {
    const entry = findCatalogEntry(catalog, domain)
    if (entry) {
      return { name: entry.name, category: entry.category, matchedOn: 'dkim' }
    }
  }
  return null
}
