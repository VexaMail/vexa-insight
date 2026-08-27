export type HostnameLookupResult = {
  hostname: string | null
  status: 'success' | 'failed' | 'not_found'
  error?: string | null
  resolvedAt: Date
}
