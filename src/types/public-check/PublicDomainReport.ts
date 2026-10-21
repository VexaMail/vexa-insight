import type { PublicCheck } from './PublicCheck'
import type { PublicConfigurationScore } from './PublicConfigurationScore'

export type PublicDomainReport = {
  domain: string
  selector?: string
  checkedAt: string
  score: PublicConfigurationScore
  checks: PublicCheck[]
}
