/** Percentage of mail the DMARC policy applies to; 100 when the tag is absent. */
export function parseDmarcPct(dmarcRecord: string): number {
  const match = /pct=(\d{1,3})/i.exec(dmarcRecord)
  if (!match?.[1]) return 100
  const pct = Number.parseInt(match[1], 10)
  if (Number.isNaN(pct) || pct < 0 || pct > 100) return 100
  return pct
}
