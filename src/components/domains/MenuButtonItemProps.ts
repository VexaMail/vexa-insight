import type { ReactNode } from 'react'

export type MenuButtonItemProps = {
  readonly icon: ReactNode
  readonly children: ReactNode
  readonly onClick: () => void
  readonly disabled?: boolean
}
