export type SelfUpdateAuditEntry = {
  timestamp: string
  actor: string
  actorType: 'session' | 'api-key'
  ip: string
  ref: string | null
  userAgent: string | null
}
