export function describeDmarcPolicy(value: string): string {
  const v = value.toLowerCase()
  if (v === 'reject') {
    return 'Emails that fail DMARC authentication will be rejected by the receiving server.'
  }
  if (v === 'quarantine') {
    return 'Emails that fail DMARC authentication will be quarantined (e.g., sent to spam) by the receiving server.'
  }
  return 'No action will be taken on emails that fail DMARC authentication. This is monitoring-only mode.'
}
