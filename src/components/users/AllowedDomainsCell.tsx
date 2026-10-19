import { StatusPill } from '@/components/ui'
import { describeAllowedDomains } from '@/utils/users'
import type { AllowedDomainsCellProps } from './AllowedDomainsCellProps'

/** Domain access as chips, or one pill when the user sees every domain. */
export function AllowedDomainsCell({
  allowedDomains,
}: Readonly<AllowedDomainsCellProps>) {
  const { text, isAll } = describeAllowedDomains(allowedDomains)
  if (isAll) return <StatusPill tone="neutral">All domains</StatusPill>
  return (
    <ul
      className="flex max-w-md flex-wrap gap-1.5"
      aria-label="Allowed domains"
    >
      {text.split(', ').map((domain) => (
        <li
          key={domain}
          className="border-border bg-secondary text-foreground rounded-md border px-1.5 py-0.5 font-mono text-xs"
        >
          {domain}
        </li>
      ))}
    </ul>
  )
}
