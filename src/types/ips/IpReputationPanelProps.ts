import type { SourceCause } from './SourceCause'

export type IpReputationPanelProps = {
  readonly ip: string
  readonly hostname: string | null
  readonly cause: SourceCause
}
