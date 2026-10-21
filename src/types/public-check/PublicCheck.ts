export type PublicCheck = {
  name: string
  status: 'pass' | 'attention' | 'unknown'
  summary: string
  recommendation: string
  records: string[]
}
