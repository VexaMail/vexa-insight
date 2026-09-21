import { xmlMarkupPattern } from '@/constants/reports'
import type { XmlToken } from '@/types/reports'
import { tokenizeXmlTag } from './tokenizeXmlTag'

/**
 * Splits one line of XML into coloured tokens. Working line by line keeps the
 * gutter and the highlighting in step; a tag broken across lines simply ends up
 * as two markup runs, which still renders correctly.
 */
export function tokenizeXmlLine(line: string): XmlToken[] {
  const tokens: XmlToken[] = []
  let lastIndex = 0

  for (const match of line.matchAll(xmlMarkupPattern)) {
    if (match.index > lastIndex) {
      tokens.push({ kind: 'text', value: line.slice(lastIndex, match.index) })
    }

    const chunk = match[0]
    lastIndex = match.index + chunk.length

    tokens.push(
      ...(chunk.startsWith('<!--')
        ? [{ kind: 'comment' as const, value: chunk }]
        : tokenizeXmlTag(chunk)),
    )
  }

  if (lastIndex < line.length) {
    tokens.push({ kind: 'text', value: line.slice(lastIndex) })
  }

  return tokens
}
