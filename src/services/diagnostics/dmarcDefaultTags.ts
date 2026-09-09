/** RFC 7489 defaults reported when a record leaves the tag out. */
export const dmarcDefaultTags: Record<string, string> = {
  adkim: 'r',
  aspf: 'r',
  pct: '100',
  fo: '0',
  rf: 'afrf',
  ri: '86400',
}
