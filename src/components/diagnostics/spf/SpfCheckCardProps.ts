import type { SpfCheckResult } from '@/types/diagnostics'

export type SpfCheckCardProps = {
  category: string
  checks: SpfCheckResult[]
}
