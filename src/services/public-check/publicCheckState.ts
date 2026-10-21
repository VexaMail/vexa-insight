import type { PublicCachedReport } from '../../types/public-check/PublicCachedReport'
import type { PublicCallerWindow } from '../../types/public-check/PublicCallerWindow'
import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'

export const publicCheckState = {
  cache: new Map<string, PublicCachedReport>(),
  pending: new Map<string, Promise<PublicDomainReport>>(),
  callers: new Map<string, PublicCallerWindow>(),
  startedAt: 0,
  count: 0,
}
