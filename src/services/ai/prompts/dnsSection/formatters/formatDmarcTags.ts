import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'

export function formatDmarcTags(dns: DiagnosticsDnsSummary): string {
  return dns.dmarcTags.length > 0
    ? dns.dmarcTags.map((tag) => `${tag.tag} => ${tag.description}`).join(' | ')
    : 'none'
}
