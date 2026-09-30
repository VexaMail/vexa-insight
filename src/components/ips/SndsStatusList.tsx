import type { SndsStatusListProps } from './SndsStatusListProps'

/** IP ranges SNDS currently lists as blocked or flagged. */
export function SndsStatusList({ statusRows }: SndsStatusListProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold">Listed by SNDS</h3>
      <ul className="text-sm">
        {statusRows.map((row) => (
          <li key={row.id} className="font-mono">
            {row.firstIp ?? '?'}
            {row.lastIp && row.lastIp !== row.firstIp ? ` - ${row.lastIp}` : ''}
            {row.blocked ? ` blocked: ${row.blocked}` : ''}
            {row.details ? ` (${row.details})` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
