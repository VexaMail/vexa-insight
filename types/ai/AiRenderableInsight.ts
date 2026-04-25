import type { InsightSeverity } from './InsightSeverity'

/** Shared UI rendering contract for all AI insight types. */
export type AiRenderableInsight = {
  severity: InsightSeverity
  title: string
  explanation: string
  recommendation: string | null
}
