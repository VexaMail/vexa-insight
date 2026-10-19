import { StatTile } from '@/components/ui'
import { DeltaText } from './DeltaText'
import type { TriageKpiTileProps } from './TriageKpiTileProps'

/** A KPI with its trend, change versus the previous period and denominator. */
export function TriageKpiTile({
  model,
  icon,
  previousLabel,
}: Readonly<TriageKpiTileProps>) {
  return (
    <StatTile
      variant="feature"
      label={model.label}
      value={model.value}
      tone={model.tone}
      accent="neutral"
      icon={icon}
      href={model.href}
      trend={model.trend}
      trendKind={model.trendKind}
      hint={
        <span className="flex flex-col gap-0.5">
          {model.delta && previousLabel ? (
            <span title={`vs ${previousLabel}`}>
              <DeltaText value={model.delta} direction={model.direction} />{' '}
              <span className="text-muted-foreground">vs prev.</span>
            </span>
          ) : null}
          <span className="truncate" title={model.context}>
            {model.context}
          </span>
        </span>
      }
    />
  )
}
