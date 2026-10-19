import { log } from '@/utils/log'
import { resolveAndPersist } from '../ip-hostname/resolveAndPersist'

/**
 * Resolves one IP of a scheduled lookup batch and logs why it failed.
 * Returns true when the lookup completed (found or not found).
 */
export async function lookupBatchIp(ip: string): Promise<boolean> {
  try {
    const result = await resolveAndPersist(ip, false, 'system')
    if (result.status !== 'failed') return true
    log.warn('[ip-hostname-lookup] lookup failed', {
      ip,
      error: result.error ?? null,
    })
    return false
  } catch (e) {
    log.error('[ip-hostname-lookup] lookup exception', {
      ip,
      error: String(e),
    })
    return false
  }
}
