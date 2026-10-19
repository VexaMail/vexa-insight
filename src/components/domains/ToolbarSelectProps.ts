import type { LucideIcon } from 'lucide-react'

export type ToolbarSelectProps = {
  readonly label: string
  readonly value: string
  readonly options: readonly {
    readonly value: string
    readonly label: string
  }[]
  readonly onChange: (value: string) => void
  /** Leading icon inside the control, e.g. a globe for the country filter. */
  readonly icon?: LucideIcon
}
