import { StatTile } from '@/components/ui'
import { DeltaText } from './DeltaText'
import type { TriageKpiTileProps } from './TriageKpiTileProps'

/** A KPI with its denominator, window and change versus the previous period. */
export function TriageKpiTile({
  model,
  icon,
  previousLabel,
}: Readonly<TriageKpiTileProps>) {
  return (
    <StatTile
      label={model.label}
      value={model.value}
      tone={model.tone}
      icon={icon}
      href={model.href}
      hint={
        <span className="flex flex-col gap-0.5">
          <span className="truncate">{model.context}</span>
          {model.delta && previousLabel ? (
            <span>
              <DeltaText value={model.delta} direction={model.direction} /> vs{' '}
              {previousLabel}
            </span>
          ) : null}
        </span>
      }
    />
  )
}
