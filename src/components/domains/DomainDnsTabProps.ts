import type { DomainScore } from '@/types/diagnostics'

export type DomainDnsTabProps = {
  readonly domainName: string
  readonly score: DomainScore
  /** The live `_dmarc` TXT record, null when none is published. */
  readonly dmarcRecord: string | null
}
