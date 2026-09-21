import type { XmlLine } from '@/types/reports'

/** Numbered lines of a raw XML document, normalising line endings. */
export function splitXmlLines(rawXml: string): XmlLine[] {
  return rawXml
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((content, index) => ({ number: index + 1, content }))
}
