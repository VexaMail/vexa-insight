import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Append-only audit trail for security- and operator-relevant actions
 * (login, install completion, role change, IMAP secret rotation, etc.).
 *
 * Writes go through `services/audit/recordAuditEvent`; never insert
 * directly so callers always include enough context.
 */
export const auditLog = sqliteTable(
  'audit_log',
  {
    id: text('id').primaryKey(),
    ts: integer('ts', { mode: 'timestamp' }).notNull(),
    actorId: text('actor_id'),
    actorEmail: text('actor_email'),
    action: text('action').notNull(),
    targetType: text('target_type'),
    targetId: text('target_id'),
    ip: text('ip'),
    userAgent: text('user_agent'),
    metadata: text('metadata'),
  },
  (table) => [
    index('audit_log_ts_idx').on(table.ts),
    index('audit_log_actor_idx').on(table.actorId),
    index('audit_log_action_idx').on(table.action),
  ],
)
