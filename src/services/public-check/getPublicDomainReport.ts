import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'
import { loadPublicReport } from './loadPublicReport'
import { publicCheckState } from './publicCheckState'
import { publicReportCacheKey } from './publicReportCacheKey'

export async function getPublicDomainReport(
  domain: string,
  selector?: string,
): Promise<PublicDomainReport | null> {
  const key = publicReportCacheKey(domain, selector)
  const cached = publicCheckState.cache.get(key)
  if (cached && cached.expiresAt > Date.now()) return cached.report
  const pending = publicCheckState.pending.get(key)
  if (pending) return pending
  if (publicCheckState.pending.size >= 4) return null
  const task = loadPublicReport(domain, selector)
  publicCheckState.pending.set(key, task)
  try {
    return await task
  } finally {
    publicCheckState.pending.delete(key)
  }
}
