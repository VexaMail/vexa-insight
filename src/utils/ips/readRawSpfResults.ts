import type { IpRawSpfResult } from '@/types/ips'
import { readXmlText } from './readXmlText'
import { toNodeList } from './toNodeList'

/** The SPF entries of a record's `auth_results`. */
export function readRawSpfResults(value: unknown): IpRawSpfResult[] {
  return toNodeList(value).map((node) => ({
    domain: readXmlText(node, 'domain'),
    scope: readXmlText(node, 'scope'),
    result: readXmlText(node, 'result'),
  }))
}
