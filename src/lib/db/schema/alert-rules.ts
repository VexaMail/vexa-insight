import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Operator-defined thresholds evaluated once a day over the DMARC results.
 * `compliance_drop` fires when a domain's DMARC pass rate over the last
 * `windowDays` fell by at least `threshold` percentage points against the
 * window before it; `compliance_below` when it is under `threshold` percent.
 * Both skip a domain with fewer than `minMessages` messages in a window, and
 * a rule fires at most once per window (`lastFiredAt`).
 */
export const alertRules = sqliteTable('alert_rules', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  kind: text('kind', {
    enum: ['compliance_drop', 'compliance_below'],
  }).notNull(),
  /** Null applies the rule to every monitored domain. */
  domainName: text('domain_name'),
  threshold: real('threshold').notNull(),
  windowDays: integer('window_days').notNull().default(7),
  minMessages: integer('min_messages').notNull().default(100),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  lastFiredAt: integer('last_fired_at'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
})
