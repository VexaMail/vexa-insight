import type { DomainDetailData } from '@/types/domains'

export type DomainTransportTabProps = {
  readonly domainName: string
  readonly tls: DomainDetailData['tls']
  readonly forensic: DomainDetailData['forensic']
}
