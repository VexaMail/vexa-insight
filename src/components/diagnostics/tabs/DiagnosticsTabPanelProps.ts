import type { ReactNode } from 'react'

export type DiagnosticsTabPanelProps = {
  readonly active: boolean
  readonly label: string
  /** False keeps an interactive tab out of the PDF export. */
  readonly printable?: boolean
  readonly children: ReactNode
}
