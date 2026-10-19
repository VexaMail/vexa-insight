import type { FailingTrafficKind } from '@/types/enforcement'
import type { DomainSource } from '@/types/reports'
import type { SourceAuthCounts } from './SourceAuthCounts'

/** One row of the domain sources table: volume, auth results and reading. */
export type DomainSourceRow = DomainSource & {
  readonly auth: SourceAuthCounts | null
  /** How the source's failing mail is read, as the readiness check does. */
  readonly kind: FailingTrafficKind
  /** DMARC-failing messages of the source. */
  readonly failing: number
}
