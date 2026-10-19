import { sortFindingsByProtocol } from '@/utils/diagnostics'
import type { ProtocolStatusTilesProps } from './ProtocolStatusTilesProps'
import { ProtocolTile } from './ProtocolTile'

/** One tile per protocol, in one row on wide screens. */
export function ProtocolStatusTiles({
  findings,
  base,
}: Readonly<ProtocolStatusTilesProps>) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {sortFindingsByProtocol(findings).map((finding) => (
        <ProtocolTile key={finding.id} finding={finding} base={base} />
      ))}
    </ul>
  )
}
