import { StatTile } from '@/components/ui'
import { findingSeverityTones } from '@/constants/diagnostics'
import {
  diagnosticsSectionHref,
  sortFindingsByProtocol,
} from '@/utils/diagnostics'
import { FindingSeverityIcon } from '../findings/FindingSeverityIcon'
import type { ProtocolStatusTilesProps } from './ProtocolStatusTilesProps'

/** One tile per protocol: state word, a short fact, a link to the evidence. */
export function ProtocolStatusTiles({
  findings,
  base,
}: Readonly<ProtocolStatusTilesProps>) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {sortFindingsByProtocol(findings).map((finding) => (
        <li key={finding.id} className="min-w-0">
          <StatTile
            className="h-full"
            label={finding.protocol}
            value={
              <span className="block truncate text-lg sm:text-xl">
                {finding.tileValue}
              </span>
            }
            hint={finding.tileHint}
            tone={findingSeverityTones[finding.severity]}
            icon={<FindingSeverityIcon severity={finding.severity} />}
            href={diagnosticsSectionHref(base, finding.section)}
          />
        </li>
      ))}
    </ul>
  )
}
