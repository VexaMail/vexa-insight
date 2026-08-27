import type { ProtocolStatusRowProps } from './ProtocolStatusRowProps'

export function deriveProtocolStatus(
  found: boolean,
  valid: boolean,
): ProtocolStatusRowProps['status'] {
  if (!found) return 'not-found'
  return valid ? 'valid' : 'invalid'
}
