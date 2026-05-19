import type { AuditAction } from './AuditAction'

export type RecordAuditEventInput = {
  action: AuditAction
  actorId?: string | null
  actorEmail?: string | null
  targetType?: string | null
  targetId?: string | null
  ip?: string | null
  userAgent?: string | null
  metadata?: Record<string, unknown> | null
}
