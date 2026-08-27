import type { ComponentType } from 'react'

export type NavItem = {
  readonly icon: ComponentType<{ readonly className?: string }>
  readonly title: string
  readonly url: string
}
