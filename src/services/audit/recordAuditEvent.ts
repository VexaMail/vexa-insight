import { auditLog, getDb } from '@/lib/db'
import type { RecordAuditEventInput } from '@/types/audit'
import crypto from 'node:crypto'

/**
 * Persist a single audit-log entry. Best-effort: callers should treat
 * audit failures as non-fatal so a logging hiccup never breaks the actual
 * operator action. Errors are swallowed and logged to stderr.
 */
export async function recordAuditEvent(
  input: RecordAuditEventInput,
): Promise<void> {
  try {
    const db = getDb()
    await db.insert(auditLog).values({
      id: crypto.randomUUID(),
      ts: new Date(),
      actorId: input.actorId ?? null,
      actorEmail: input.actorEmail ?? null,
      action: input.action,
      targetType: input.targetType ?? null,
      targetId: input.targetId ?? null,
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
      metadata: input.metadata ? JSON.stringify(input.metadata) : null,
    })
  } catch (err) {
    console.warn('[audit] failed to record event', {
      action: input.action,
      err,
    })
  }
}
