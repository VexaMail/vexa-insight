import { xmlTagPartPattern } from '@/constants/reports'
import type { XmlToken } from '@/types/reports'

/** Splits one tag (or processing instruction) into name, attribute and punctuation tokens. */
export function tokenizeXmlTag(chunk: string): XmlToken[] {
  const tokens: XmlToken[] = []
  let isFirstName = true

  for (const part of chunk.matchAll(xmlTagPartPattern)) {
    const [whole, attrName, attrValue, bareName, punctuation] = part

    if (attrName !== undefined && attrValue !== undefined) {
      const separator = whole.slice(
        attrName.length,
        whole.length - attrValue.length,
      )
      tokens.push({ kind: 'attrName', value: attrName })
      tokens.push({ kind: 'markup', value: separator })
      tokens.push({ kind: 'attrValue', value: attrValue })
      continue
    }

    if (bareName !== undefined) {
      tokens.push({
        kind: isFirstName ? 'tagName' : 'attrName',
        value: bareName,
      })
      isFirstName = false
      continue
    }

    tokens.push({ kind: 'markup', value: punctuation ?? whole })
  }

  return tokens
}
