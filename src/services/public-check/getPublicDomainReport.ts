import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'
import { loadPublicReport } from './loadPublicReport'
import { publicCheckState } from './publicCheckState'

export async function getPublicDomainReport(
  domain: string,
): Promise<PublicDomainReport | null> {
  const cached = publicCheckState.cache.get(domain)
  if (cached && cached.expiresAt > Date.now()) return cached.report
  const pending = publicCheckState.pending.get(domain)
  if (pending) return pending
  if (publicCheckState.pending.size >= 4) return null
  const task = loadPublicReport(domain)
  publicCheckState.pending.set(domain, task)
  try {
    return await task
  } finally {
    publicCheckState.pending.delete(domain)
  }
}
