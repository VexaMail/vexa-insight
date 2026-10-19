import type { IpRawDkimResult } from '@/types/ips'
import { readXmlText } from './readXmlText'
import { toNodeList } from './toNodeList'

/** The DKIM entries of a record's `auth_results`. */
export function readRawDkimResults(value: unknown): IpRawDkimResult[] {
  return toNodeList(value).map((node) => ({
    domain: readXmlText(node, 'domain'),
    selector: readXmlText(node, 'selector'),
    result: readXmlText(node, 'result'),
  }))
}
