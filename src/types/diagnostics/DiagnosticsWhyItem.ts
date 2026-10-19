import type { StatusTone } from '@/types/ui'
import type { LucideIcon } from 'lucide-react'

/** One reason in the "Why this matters" panel. */
export type DiagnosticsWhyItem = {
  readonly icon: LucideIcon
  /** Tint of the icon square. */
  readonly tone: StatusTone
  readonly title: string
  readonly text: string
}
