import type { DiagnosticsLinkBase } from '@/types/diagnostics'
import type { DiagnosticsViewProps } from '../DiagnosticsViewProps'

export type DiagnosticsTabPanelsProps = Pick<
  DiagnosticsViewProps,
  'activeTab' | 'dns' | 'score' | 'findings' | 'guides' | 'runbook'
> & {
  readonly base: DiagnosticsLinkBase
}
