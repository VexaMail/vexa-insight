import type { SenderCatalogEntry } from '@/types/senders'
import { domainMatchesSuffix } from './domainMatchesSuffix'

/** The first catalog entry one of whose domains `name` falls under. */
export function findCatalogEntry(
  catalog: readonly SenderCatalogEntry[],
  name: string,
): SenderCatalogEntry | null {
  return (
    catalog.find((entry) =>
      entry.domains.some((suffix) => domainMatchesSuffix(name, suffix)),
    ) ?? null
  )
}
