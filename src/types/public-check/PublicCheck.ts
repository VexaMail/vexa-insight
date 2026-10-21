export type PublicCheck = {
  name: string
  status: 'pass' | 'attention' | 'unknown' | 'info'
  dnsUnavailable?: boolean
  points?: number | null
  summary: string
  recommendation: string
  records: string[]
}
