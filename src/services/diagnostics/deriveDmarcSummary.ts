import type { DmarcSummary } from '@/types/diagnostics'
import { extractDmarcWarnings } from './extractDmarcWarnings'
import { parseDmarcPolicy } from './parseDmarcPolicy'
import { parseDmarcTags } from './parseDmarcTags'

/** Joins and interprets the _dmarc TXT record. */
export function deriveDmarcSummary(dmarcTxt: string[][]): DmarcSummary {
  const dmarcFlat = dmarcTxt.flat().join('')
  const dmarc = dmarcFlat.length > 0 ? dmarcFlat : null
  const dmarcWarnings = dmarc ? extractDmarcWarnings(dmarc) : []
  return {
    dmarc,
    dmarcPolicy: dmarc ? parseDmarcPolicy(dmarc) : null,
    dmarcWarnings,
    dmarcValid: dmarc !== null && dmarcWarnings.length === 0,
    dmarcTags: dmarc ? parseDmarcTags(dmarc) : [],
  }
}
