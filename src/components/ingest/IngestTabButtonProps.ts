import type { ReactNode } from 'react'

export type IngestTabButtonProps = {
  readonly active: boolean
  readonly onClick: () => void
  readonly children: ReactNode
}
