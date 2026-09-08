import type { OverallResult } from './OverallResult'

export type UseEmailPipelineCardReturn = {
  readonly barColor: string
  readonly expanded: boolean
  readonly headlineText: string
  readonly overall: OverallResult
  readonly progressLabel: string
  readonly handleToggleExpanded: () => void
}
