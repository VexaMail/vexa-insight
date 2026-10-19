import type { SndsStatusListProps } from './SndsStatusListProps'

/** IP ranges SNDS currently lists as blocked or flagged. */
export function SndsStatusList({ statusRows }: SndsStatusListProps) {
  return (
    <div className="border-border space-y-1 border-t p-4">
      <h3 className="text-danger text-xs font-semibold">Listed by SNDS</h3>
      <ul className="text-foreground space-y-0.5 font-mono text-[13px]">
        {statusRows.map((row) => (
          <li key={row.id} className="break-words">
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
