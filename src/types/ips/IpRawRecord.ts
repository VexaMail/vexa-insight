import type { IpRawDkimResult } from './IpRawDkimResult'
import type { IpRawReportMeta } from './IpRawReportMeta'
import type { IpRawSpfResult } from './IpRawSpfResult'

/** One aggregate report `record` for this source, read from the stored XML. */
export type IpRawRecord = IpRawReportMeta & {
  readonly key: string
  readonly sourceIp: string
  readonly count: number
  readonly disposition: string
  /** Aligned DKIM verdict of `policy_evaluated`. */
  readonly policyDkim: string
  /** Aligned SPF verdict of `policy_evaluated`. */
  readonly policySpf: string
  readonly headerFrom: string
  readonly envelopeFrom: string
  readonly dkim: readonly IpRawDkimResult[]
  readonly spf: readonly IpRawSpfResult[]
  /** The record exactly as the XML parser returned it. */
  readonly record: unknown
}
