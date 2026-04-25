import type { InsightCategory } from './InsightCategory'
import type { InsightSeverity } from './InsightSeverity'

export type ReportInsight = {
  category: InsightCategory
  severity: InsightSeverity
  title: string
  explanation: string
  recommendation: string | null
}
