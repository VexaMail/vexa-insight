import type { ReactNode } from 'react'

export type DiagnosticsTabPanelProps = {
  readonly active: boolean
  readonly label: string
  readonly children: ReactNode
}
