import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'

export type OperatorPanelsProps = {
  readonly ip: string
  readonly domains: readonly IpRelatedDomainRow[]
}
