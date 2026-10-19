import type { StatusTone } from '@/types/ui'

/** How a severity reads as a badge: its tone and its word. */
export type SeverityBadge = {
  tone: StatusTone
  label: string
}
