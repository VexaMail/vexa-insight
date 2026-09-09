import type { DnsDiagnostics } from '@/types/diagnostics'
import { deriveDmarcSummary } from './deriveDmarcSummary'
import { deriveSpfSummary } from './deriveSpfSummary'
import { parseDkimRecord } from './parseDkimRecord'
import { probeDkim } from './probeDkim'
import { resolveARecords } from './resolveARecords'
import { resolveBimi } from './resolveBimi'
import { resolveMtaSts } from './resolveMtaSts'
import { resolveMxSafe } from './resolveMxSafe'
import { resolveNsRecords } from './resolveNsRecords'
import { resolveSpfTree } from './resolveSpfTree'
import { resolveTlsRpt } from './resolveTlsRpt'
import { resolveTxtSafe } from './resolveTxtSafe'
import { sortMxRecords } from './sortMxRecords'

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
    spfTree,
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
    resolveSpfTree(domain),
  ])

  return {
    domain,
    txtRecords,
    ...deriveSpfSummary(txtRecords),
    ...deriveDmarcSummary(dmarcTxt),
    dkim: dkimRecords,
    dkimParsedRecords: dkimRecords.map((record) => parseDkimRecord(record)),
    mx: sortMxRecords(mxRecords),
    spfTree,
    bimi,
    mtaSts,
    tlsRpt,
    aRecords,
    nsRecords,
  }
}
