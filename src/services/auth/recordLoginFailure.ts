import { recordAuditEvent } from '@/services/audit'
import type { LoginFailureInput } from '@/types/auth'

export async function recordLoginFailure({
  actorId,
  actorEmail,
  ip,
  userAgent,
  reason,
}: LoginFailureInput): Promise<void> {
  await recordAuditEvent({
    action: 'auth.login.failure',
    ...(actorId === undefined ? {} : { actorId }),
    actorEmail,
    ip,
    userAgent,
    metadata: { reason },
  })
}
