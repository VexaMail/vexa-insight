import type { EnforcementReadiness } from '@/types/enforcement'

export type ForwardersTileProps = {
  readonly readiness: EnforcementReadiness
  readonly reviewHref: string
}
