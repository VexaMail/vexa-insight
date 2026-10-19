import type { DiagnosticsTabKey } from '@/types/diagnostics'
import type { ReactNode } from 'react'

export type DiagnosticsTabPanelProps = {
  /** The tab this panel belongs to; it shows while that tab is active. */
  readonly tab: DiagnosticsTabKey
  readonly label: string
  /** False keeps an interactive tab out of the PDF export. */
  readonly printable?: boolean
  readonly children: ReactNode
}
