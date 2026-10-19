import type { DomainDetailData } from '@/types/domains'

export type DomainSourcesTabProps = {
  readonly domainId: number
  readonly domainName: string
  readonly data: DomainDetailData
}
