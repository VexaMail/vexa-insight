import type { IpDkimSignature } from '@/types/ips'

/** `d=a.example (s=sel), d=b.example` for the given signatures, at most three. */
export function formatSignerList(
  signatures: readonly IpDkimSignature[],
): string {
  const unique = [...new Set(signatures.map((sig) => `d=${sig.domain}`))]
  const shown = unique.slice(0, 3).join(', ')
  return unique.length > 3
    ? `${shown} and ${String(unique.length - 3)} more`
    : shown
}
