import { defaultMtaStsMaxAge } from '@/constants/diagnostics'
import type {
  MtaStsGeneratorFields,
  RecordGeneratorInput,
} from '@/types/diagnostics'
import { mtaStsPolicyId } from './mtaStsPolicyId'
import { uniqueMxRecords } from './uniqueMxRecords'

/**
 * The MTA-STS form filled from the served policy, or from the MX records
 * when there is none; the policy id is dated from the run.
 */
export function mtaStsFieldsFromDns({
  dns,
  checkedAt,
}: RecordGeneratorInput): MtaStsGeneratorFields {
  const served = dns.mtaSts.mxRecords
  const mx =
    served.length > 0
      ? served
      : uniqueMxRecords(dns.mx).map((record) => record.exchange)
  const maxAge = /^\d+$/.test(dns.mtaSts.fileAge ?? '')
    ? (dns.mtaSts.fileAge ?? '')
    : String(defaultMtaStsMaxAge)
  return {
    mode: dns.mtaSts.mode ?? 'testing',
    mx: mx.map((host) => host.replace(/\.$/, '')).join(' '),
    maxAge,
    id: mtaStsPolicyId(checkedAt),
  }
}
