import type { LucideIcon } from 'lucide-react'

/** One entry of the settings section index: anchor, label, icon and group. */
export type SettingsSectionLink = {
  readonly id: string
  readonly label: string
  readonly icon: LucideIcon
  /** Heading the index lists the entry under. */
  readonly group: string
}
