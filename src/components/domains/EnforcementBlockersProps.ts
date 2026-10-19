import type { EnforcementReadiness } from '@/types/enforcement'

export type EnforcementBlockersProps = {
  readonly domainName: string
  readonly readiness: EnforcementReadiness
}
