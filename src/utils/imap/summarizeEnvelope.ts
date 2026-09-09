import type { EnvelopeSummary } from '@/types/imap'
import type { FetchMessageObject } from 'imapflow'
import { envelopeDateToIso } from './envelopeDateToIso'

/** Subject, ISO date and a message id that falls back to the UID. */
export function summarizeEnvelope(
  envMsg: FetchMessageObject,
  uidStr: string,
): EnvelopeSummary {
  return {
    subject: envMsg.envelope?.subject,
    emailDate: envelopeDateToIso(envMsg.envelope?.date),
    messageId: envMsg.envelope?.messageId ?? `uid:${uidStr}`,
  }
}
