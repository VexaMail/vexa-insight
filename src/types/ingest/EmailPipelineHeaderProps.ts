import type { ProgressItem } from '@/types/dashboard'

export type EmailPipelineHeaderProps = {
  readonly item: ProgressItem
  readonly headlineText: string
  readonly overallStatus: 'pending' | 'active' | 'done' | 'error'
  readonly expanded: boolean
  readonly onToggleExpanded: () => void
}
