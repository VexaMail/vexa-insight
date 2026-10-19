import type { StatusTone } from '@/types/ui'

/** A report's DMARC outcome as a pill: its colour and its words. */
export type ReportOutcomeLabel = {
  readonly tone: StatusTone
  readonly label: string
}
