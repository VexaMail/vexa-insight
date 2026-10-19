import type { IpRawRecord, IpRawReportMeta } from '@/types/ip-detail'
import { XMLParser } from 'fast-xml-parser'
import { readRawRecord } from './readRawRecord'
import { readXmlNode } from './readXmlNode'
import { readXmlText } from './readXmlText'
import { toNodeList } from './toNodeList'

/**
 * The records of one stored aggregate report whose `source_ip` is `ip`, with
 * the same parser options ingestion uses. Unreadable XML yields no records.
 */
export function extractIpRawRecords(
  rawXml: string,
  ip: string,
  meta: IpRawReportMeta,
): IpRawRecord[] {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    trimValues: true,
    processEntities: false,
  })
  let parsed: unknown
  try {
    parsed = parser.parse(rawXml)
  } catch {
    return []
  }
  const wanted = ip.trim().toLowerCase()
  return toNodeList(readXmlNode(readXmlNode(parsed, 'feedback'), 'record'))
    .filter((record) => {
      const source = readXmlText(readXmlNode(record, 'row'), 'source_ip')
      return source.trim().toLowerCase() === wanted
    })
    .map((record, index) => readRawRecord(record, meta, index))
}
