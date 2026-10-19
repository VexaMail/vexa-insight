import type { DomainScoreCheck } from '@/types/diagnostics'

/** What each protocol acronym stands for, under the check name. */
export const protocolFullNames: Record<DomainScoreCheck['id'], string> = {
  dmarc: 'Domain-based Message Authentication, Reporting and Conformance',
  spf: 'Sender Policy Framework',
  dkim: 'DomainKeys Identified Mail',
  mtaSts: 'SMTP MTA Strict Transport Security',
  tlsRpt: 'SMTP TLS Reporting',
  bimi: 'Brand Indicators for Message Identification',
}
