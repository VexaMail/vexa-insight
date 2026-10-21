import type { PublicDomainReport } from './PublicDomainReport'

export type PublicDomainHistoryOptions = {
  initialDomain: string
  load: (domain: string) => Promise<PublicDomainReport | null>
  reset: () => void
  setDomain: (domain: string) => void
}
