import type { PublicCheck } from './PublicCheck'

export type PublicDomainReport = {
  domain: string
  checkedAt: string
  checks: PublicCheck[]
}
