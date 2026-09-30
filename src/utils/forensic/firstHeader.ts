import type { HeaderBlock } from '@/types/forensic'

/** The first non-empty value of a header field, or null. */
export function firstHeader(block: HeaderBlock, name: string): string | null {
  const value = block.get(name.toLowerCase())?.find((v) => v !== '')
  return value ?? null
}
