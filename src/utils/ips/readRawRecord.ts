import type { IpRawRecord, IpRawReportMeta } from '@/types/ip-detail'
import { readRawDkimResults } from './readRawDkimResults'
import { readRawSpfResults } from './readRawSpfResults'
import { readXmlNode } from './readXmlNode'
import { readXmlText } from './readXmlText'

/** One parsed `record` element as the fields the raw data tab shows. */
export function readRawRecord(
  record: unknown,
  meta: IpRawReportMeta,
  index: number,
): IpRawRecord {
  const row = readXmlNode(record, 'row')
  const policy = readXmlNode(row, 'policy_evaluated')
  const identifiers = readXmlNode(record, 'identifiers')
  const auth = readXmlNode(record, 'auth_results')
  return {
    ...meta,
    key: `${String(meta.reportDbId)}-${String(index)}`,
    sourceIp: readXmlText(row, 'source_ip'),
    count: Number(readXmlText(row, 'count')) || 0,
    disposition: readXmlText(policy, 'disposition'),
    policyDkim: readXmlText(policy, 'dkim'),
    policySpf: readXmlText(policy, 'spf'),
    headerFrom: readXmlText(identifiers, 'header_from'),
    envelopeFrom: readXmlText(identifiers, 'envelope_from'),
    dkim: readRawDkimResults(readXmlNode(auth, 'dkim')),
    spf: readRawSpfResults(readXmlNode(auth, 'spf')),
    record,
  }
}
