import type { ReactNode } from 'react'

export type SectionHeaderProps = {
  title: string
  found: boolean
  icon?: ReactNode
  helpText?: string | undefined
}
