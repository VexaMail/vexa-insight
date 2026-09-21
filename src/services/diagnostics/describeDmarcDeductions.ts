import { hasDmarcRua } from './hasDmarcRua'
import { parseDmarcPct } from './parseDmarcPct'

/** What is costing the domain DMARC points, in the order shown to the user. */
export function describeDmarcDeductions(
  dmarcRecord: string,
  policy: string,
): string[] {
  const notes: string[] = []
  const pct = parseDmarcPct(dmarcRecord)

  if (policy === 'none') {
    notes.push('p=none only monitors; move to quarantine, then reject')
  }

  if (policy !== 'none' && pct < 100) {
    notes.push(`pct=${String(pct)} leaves the rest of the mail unenforced`)
  }

  if (!hasDmarcRua(dmarcRecord)) {
    notes.push('no rua address, so no aggregate reports arrive')
  }

  return notes
}
