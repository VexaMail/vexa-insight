/**
 * Checks if a message subject looks like a DMARC report.
 * This runs locally, replacing the slow IMAP OR search strings.
 */
export function isDmarcCandidate(subject?: string): boolean {
  if (!subject) return false
  const s = subject.toLowerCase()
  return (
    s.includes('report domain:') ||
    s.includes('dmarc') ||
    s.includes('aggregate') ||
    s.includes('rua') ||
    s.includes('report-id')
  )
}
