import type { OverallResult } from '@/utils/ingest'

export type UseEmailPipelineCardReturn = {
  readonly barColor: string
  readonly expanded: boolean
  readonly headlineText: string
  readonly overall: OverallResult
  readonly progressLabel: string
  readonly handleToggleExpanded: () => void
}
