import type { ReactNode } from 'react'

export type InsightRowProps = {
  readonly label: string
  readonly children: ReactNode
  readonly mono?: boolean
  readonly title?: string | undefined
}
