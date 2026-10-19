import type { LucideIcon } from 'lucide-react'

/** One reason in the "Why this matters" panel. */
export type DiagnosticsWhyItem = {
  readonly icon: LucideIcon
  readonly title: string
  readonly text: string
}
