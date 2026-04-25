import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { getConfig } from '@/services/config'
import { eq, lte, or } from 'drizzle-orm'
import { IpHostnameEnrichmentService } from '../ip-hostname/IpHostnameEnrichmentService'

export async function processIpHostnameLookupJob() {
  const config = getConfig()
  const db = getDb()
  const now = new Date()

  if (!config.ipHostnameLookupEnabled) {
    return { processed: 0, skipped: 0, errors: 0 }
  }

  try {
    // Select batch where either it's pending OR nextLookup is due
    const batch = await db
      .select({ ip: ipHostnameEnrichments.ip, id: ipHostnameEnrichments.id })
      .from(ipHostnameEnrichments)
      .where(
        or(
          eq(ipHostnameEnrichments.lookupStatus, 'pending'),
          lte(ipHostnameEnrichments.nextLookupAt, now),
        ),
      )
      .limit(config.ipHostnameBatchSize)

    if (batch.length === 0) return { processed: 0, skipped: 0, errors: 0 }

    let processed = 0
    let errors = 0
    const skipped = 0

    // Process sequentially to be gentle, could use Promise.allSettled but sequential is safer for DNS initially
    for (const record of batch) {
      try {
        const result = await IpHostnameEnrichmentService.resolveAndPersist(
          record.ip,
          false,
          'system',
        )
        if (result.status === 'failed') {
          errors++
        } else {
          processed++
        }
      } catch (e) {
        errors++
        console.error(
          `[processIpHostnameLookupJob] Exception processing ${record.ip}:`,
          e,
        )
      }
    }

    return { processed, skipped, errors }
  } catch (error) {
    console.error(
      '[processIpHostnameLookupJob] Critical error in batch selection:',
      error,
    )
    return { processed: 0, skipped: 0, errors: 1 }
  }
}
