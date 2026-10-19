import type { DiagnosticsLinkBase } from './DiagnosticsLinkBase'
import type { DiagnosticsTabKey } from './DiagnosticsTabKey'

export type DiagnosticsTabHrefParams = DiagnosticsLinkBase & {
  readonly tab: DiagnosticsTabKey
  /** Element id to scroll to once the tab is shown. */
  readonly anchor?: string
}
