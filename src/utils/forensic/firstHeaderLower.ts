import type { HeaderBlock } from '@/types/forensic'
import { firstHeader } from './firstHeader'

/** The first value of a header field, lower-cased without a trailing dot. */
export function firstHeaderLower(
  block: HeaderBlock,
  name: string,
): string | null {
  return firstHeader(block, name)?.toLowerCase().replace(/\.$/, '') ?? null
}
