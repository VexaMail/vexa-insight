import { StatusPill } from '@/components/ui'
import { Database, Lock, Server } from 'lucide-react'

/** What signing in here does and does not involve, as three pills. */
export function LoginTrustPills() {
  return (
    <ul
      className="flex flex-wrap justify-center gap-2"
      aria-label="This instance"
    >
      <li>
        <StatusPill tone="neutral" icon={<Server />}>
          Self-hosted
        </StatusPill>
      </li>
      <li>
        <StatusPill tone="neutral" icon={<Database />}>
          Local SQLite
        </StatusPill>
      </li>
      <li>
        <StatusPill tone="neutral" icon={<Lock />}>
          Mailbox passwords encrypted
        </StatusPill>
      </li>
    </ul>
  )
}
