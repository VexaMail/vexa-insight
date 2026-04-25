import type { DnsDiagnostics, MxRecord } from '@/types/diagnostics'
import { analyzeSpfRecord } from './analyzeSpfRecord'
import { extractDmarcWarnings } from './extractDmarcWarnings'
import { extractSpfWarning } from './extractSpfWarning'
import { parseDkimRecord } from './parseDkimRecord'
import { parseDmarcPolicy } from './parseDmarcPolicy'
import { parseDmarcTags } from './parseDmarcTags'
import { probeDkim } from './probeDkim'
import { resolveARecords } from './resolveARecords'
import { resolveBimi } from './resolveBimi'
import { resolveMtaSts } from './resolveMtaSts'
import { resolveMxSafe } from './resolveMxSafe'
import { resolveNsRecords } from './resolveNsRecords'
import { resolveTlsRpt } from './resolveTlsRpt'
import { resolveTxtSafe } from './resolveTxtSafe'

export async function getDomainDnsRecords(
  domain: string,
): Promise<DnsDiagnostics> {
  const [
    txtRecords,
    dmarcTxt,
    mxRecords,
    dkimRecords,
    bimi,
    mtaSts,
    tlsRpt,
    aRecords,
    nsRecords,
  ] = await Promise.all([
    resolveTxtSafe(domain),
    resolveTxtSafe(`_dmarc.${domain}`),
    resolveMxSafe(domain),
    probeDkim(domain),
    resolveBimi(domain),
    resolveMtaSts(domain),
    resolveTlsRpt(domain),
    resolveARecords(domain),
    resolveNsRecords(domain),
  ])

  // SPF
  const allTxt = txtRecords.map((r) => r.join(''))
  const allSpfRecords = allTxt.filter((r) => r.startsWith('v=spf1'))
  const spf = allSpfRecords[0] ?? null
  const spfValid = allSpfRecords.length === 1
  const spfWarning = spf ? extractSpfWarning(spf, allSpfRecords) : null
  const spfValidationCategories = analyzeSpfRecord(spf, allSpfRecords)

  // DMARC
  const dmarcFlat = dmarcTxt.flat().join('')
  const dmarc = dmarcFlat.length > 0 ? dmarcFlat : null
  const dmarcPolicy = dmarc ? parseDmarcPolicy(dmarc) : null
  const dmarcWarnings = dmarc ? extractDmarcWarnings(dmarc) : []
  const dmarcValid = dmarc !== null && dmarcWarnings.length === 0
  const dmarcTags = dmarc ? parseDmarcTags(dmarc) : []
  const dkimParsedRecords = dkimRecords.map((record) => parseDkimRecord(record))

  // MX — sorted ascending by priority
  const mx: MxRecord[] = mxRecords
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map(({ priority, exchange }) => ({ priority, exchange }))

  return {
    domain,
    txtRecords,
    spf,
    spfValid,
    spfWarning,
    dmarc,
    dmarcPolicy,
    dmarcValid,
    dmarcWarnings,
    dmarcTags,
    dkim: dkimRecords,
    dkimParsedRecords,
    mx,
    spfValidationCategories,
    bimi,
    mtaSts,
    tlsRpt,
    aRecords,
    nsRecords,
  }
}
