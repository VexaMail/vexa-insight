import {
  index,
  integer,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core'

/**
 * One DMARC failure report (RFC 6591 ARF). Addresses are stored as domains
 * only and no subject or body is kept; see `ForensicReport`. The report mail's
 * Message-ID makes re-polling idempotent.
 */
export const forensicReports = sqliteTable(
  'forensic_reports',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    reportedDomain: text('reported_domain').notNull(),
    feedbackType: text('feedback_type').notNull(),
    authFailure: text('auth_failure'),
    sourceIp: text('source_ip'),
    reportingMta: text('reporting_mta'),
    arrivalDate: integer('arrival_date').notNull(),
    headerFromDomain: text('header_from_domain'),
    envelopeFromDomain: text('envelope_from_domain'),
    dkimDomain: text('dkim_domain'),
    dkimSelector: text('dkim_selector'),
    spfResult: text('spf_result'),
    dkimResult: text('dkim_result'),
    dmarcResult: text('dmarc_result'),
    originalMessageId: text('original_message_id'),
    listId: text('list_id'),
    sourceMessageId: text('source_message_id'),
    ingestedAt: integer('ingested_at', { mode: 'timestamp' }).notNull(),
  },
  (t) => [
    unique('forensic_reports_source_message_idx').on(t.sourceMessageId),
    index('forensic_reports_domain_arrival_idx').on(
      t.reportedDomain,
      t.arrivalDate,
    ),
  ],
)
