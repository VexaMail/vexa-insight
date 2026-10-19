import type { EnforcementReadiness } from '@/types/enforcement'

export type ReadinessTileProps = {
  readonly readiness: EnforcementReadiness
  readonly reviewHref: string
}
