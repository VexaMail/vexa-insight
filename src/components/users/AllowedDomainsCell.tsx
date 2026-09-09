import { describeAllowedDomains } from '@/utils/users'
import type { AllowedDomainsCellProps } from './AllowedDomainsCellProps'

export function AllowedDomainsCell({
  allowedDomains,
}: Readonly<AllowedDomainsCellProps>) {
  const { text, isAll } = describeAllowedDomains(allowedDomains)
  if (isAll) {
    return <span className="text-muted-foreground text-xs italic">{text}</span>
  }
  return <span className="text-xs">{text}</span>
}
