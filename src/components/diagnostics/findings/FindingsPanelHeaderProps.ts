import type { UseFindingsFilterReturn } from '@/types/diagnostics'

export type FindingsPanelHeaderProps = {
  readonly domain: string
  readonly filter: UseFindingsFilterReturn
}
