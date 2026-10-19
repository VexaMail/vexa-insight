import type { DiagnosticsLinkBase } from '@/types/diagnostics'
import type { DiagnosticsViewProps } from '../DiagnosticsViewProps'

export type DiagnosticsTabPanelsProps = Pick<
  DiagnosticsViewProps,
  'dns' | 'score' | 'findings' | 'guides' | 'runbook' | 'domainId' | 'checkedAt'
> & {
  readonly base: DiagnosticsLinkBase
}
