import { domains } from '@/lib/db'
import type { IpDomainsSort } from '@/types/ips'
import type { SQL } from 'drizzle-orm'
import { asc, desc, sql } from 'drizzle-orm'

/**
 * Order of the related-domains listing. Every variant ends on the domain id so
 * that rows tied on the sort key keep a stable position across pages; without
 * it, "Load more" can return a domain the first page already showed.
 */
export function ipDomainsOrderBy(sort: IpDomainsSort): SQL[] {
  const tiebreak = asc(domains.id)

  if (sort === 'lastSeen') {
    return [desc(sql`last_seen`), tiebreak]
  }

  if (sort === 'domain') {
    return [asc(domains.name), tiebreak]
  }

  return [desc(sql`msg_count`), desc(sql`last_seen`), tiebreak]
}
