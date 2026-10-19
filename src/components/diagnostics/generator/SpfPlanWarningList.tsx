import { TriangleAlert } from 'lucide-react'
import type { SpfPlanWarningListProps } from './SpfPlanWarningListProps'

/** What a receiver would trip over in the planned record. */
export function SpfPlanWarningList({
  warnings,
}: Readonly<SpfPlanWarningListProps>) {
  if (warnings.length === 0) return null
  return (
    <ul className="space-y-1">
      {warnings.map((warning) => (
        <li
          key={warning}
          className="text-warning flex items-start gap-1.5 text-xs"
        >
          <TriangleAlert aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="break-words">{warning}</span>
        </li>
      ))}
    </ul>
  )
}
