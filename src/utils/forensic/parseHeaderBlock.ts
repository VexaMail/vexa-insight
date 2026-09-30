import type { HeaderBlock } from '@/types/forensic'

/**
 * Parses an RFC 5322 style header block (also the format of an RFC 5965
 * feedback part): unfolds continuation lines and groups values by lower-cased
 * field name. Parsing stops at the first empty line, where a body would start.
 */
export function parseHeaderBlock(text: string): HeaderBlock {
  const block: HeaderBlock = new Map()
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  let current: { name: string; value: string } | null = null
  const flush = (): void => {
    if (current === null) return
    const values = block.get(current.name) ?? []
    values.push(current.value.trim())
    block.set(current.name, values)
  }
  for (const line of lines) {
    if (line.trim() === '') break
    if (/^[ \t]/.test(line) && current !== null) {
      current.value += ` ${line.trim()}`
      continue
    }
    const colon = line.indexOf(':')
    if (colon <= 0) continue
    flush()
    current = {
      name: line.slice(0, colon).trim().toLowerCase(),
      value: line.slice(colon + 1),
    }
  }
  flush()
  return block
}
