export function getEvaluatedPublicSpfRecord(record: string): string {
  const terms = record.trim().split(/\s+/)
  const terminal = terms.findIndex((term) => /^[+~?-]?all$/i.test(term))
  return terminal < 0 ? record : terms.slice(0, terminal + 1).join(' ')
}
