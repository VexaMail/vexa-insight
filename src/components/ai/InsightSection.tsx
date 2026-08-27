import { DiagnosticsInsightCard } from './DiagnosticsInsightCard'
import type { InsightSectionProps } from './InsightSectionProps'

export function InsightSection({
  title,
  description,
  insights,
}: Readonly<InsightSectionProps>) {
  if (insights.length === 0) return null

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      {insights.map((insight, i) => (
        <DiagnosticsInsightCard
          key={`${insight.title}-${String(i)}`}
          insight={insight}
        />
      ))}
    </div>
  )
}
