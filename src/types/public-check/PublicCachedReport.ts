import type { PublicDomainReport } from './PublicDomainReport'

export type PublicCachedReport = {
  expiresAt: number
  report: PublicDomainReport
}
