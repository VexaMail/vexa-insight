import type { ReactNode } from 'react'

export type LoadingPanelProps = {
  /** What is being waited for, e.g. "Running DNS checks". */
  readonly children: ReactNode
  readonly className?: string
}
