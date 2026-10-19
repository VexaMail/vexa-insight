import type { DnsDiagnostics } from '@/types/diagnostics'

/** The first `mailto:` address of the DMARC `rua=` tag, if any. */
export function dmarcRuaMailto(dns: DnsDiagnostics): string | null {
  const rua = dns.dmarcTags.find((tag) => tag.tag === 'rua')?.value ?? ''
  const address = rua
    .split(',')
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith('mailto:'))
  return address ?? null
}
