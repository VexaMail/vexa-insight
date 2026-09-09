import type { ReactNode } from 'react'

export type SettingsSectionHeaderProps = {
  readonly headingId: string
  readonly icon: ReactNode
  readonly iconClassName: string
  readonly title: string
  readonly description: string
}
