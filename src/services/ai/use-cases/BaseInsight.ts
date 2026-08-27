import type { InsightSeverity } from '../contracts/InsightSeverity'

export type BaseInsight = {
  category: string
  severity: InsightSeverity
  title: string
  explanation: string
  recommendation: string | null
}
