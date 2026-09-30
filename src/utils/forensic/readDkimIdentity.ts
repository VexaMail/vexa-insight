import type { HeaderBlock } from '@/types/forensic'
import { firstHeader } from './firstHeader'
import { firstHeaderLower } from './firstHeaderLower'
import { readTagValue } from './readTagValue'

/**
 * The DKIM domain and selector: the feedback's `DKIM-Domain` and
 * `DKIM-Selector` fields, else the `d=` and `s=` tags of the reported
 * message's DKIM-Signature.
 */
export function readDkimIdentity(
  feedback: HeaderBlock,
  headers: HeaderBlock,
): { dkimDomain: string | null; dkimSelector: string | null } {
  const signature = firstHeader(headers, 'dkim-signature')
  return {
    dkimDomain:
      firstHeaderLower(feedback, 'dkim-domain') ?? readTagValue(signature, 'd'),
    dkimSelector:
      firstHeaderLower(feedback, 'dkim-selector') ??
      readTagValue(signature, 's'),
  }
}
