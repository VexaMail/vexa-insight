import { StatTile } from '@/components/ui'
import { summarizeUsers } from '@/utils/users'
import { Globe, ShieldCheck, Users } from 'lucide-react'
import type { UsersSummaryTilesProps } from './UsersSummaryTilesProps'

/** Accounts, admins and domain-limited accounts, as feature tiles. */
export function UsersSummaryTiles({ users }: Readonly<UsersSummaryTilesProps>) {
  const summary = summarizeUsers(users)
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatTile
        variant="feature"
        icon={<Users />}
        accent="neutral"
        label="Accounts"
        value={summary.total}
        hint={`${String(summary.viewers)} viewer${summary.viewers === 1 ? '' : 's'}`}
      />
      <StatTile
        variant="feature"
        icon={<ShieldCheck />}
        accent="info"
        label="Admins"
        value={summary.admins}
        hint="Full access, settings included"
      />
      <StatTile
        variant="feature"
        icon={<Globe />}
        accent={summary.restricted > 0 ? 'warning' : 'unknown'}
        label="Domain-limited"
        value={summary.restricted}
        hint={`of ${String(summary.total)} see only listed domains`}
      />
    </div>
  )
}
