import { MAX_XML_LENGTH } from './maxXmlLength'

export function truncateReportXml(rawXml: string): string {
  return rawXml.length > MAX_XML_LENGTH
    ? rawXml.slice(0, MAX_XML_LENGTH)
    : rawXml
}
