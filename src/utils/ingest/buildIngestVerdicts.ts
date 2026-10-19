import type { HealthVerdict, IngestHealth } from '@/types/ingest'
import { freshnessVerdict } from './freshnessVerdict'
import { mailboxesVerdict } from './mailboxesVerdict'
import { processingVerdict } from './processingVerdict'
import { schedulerVerdict } from './schedulerVerdict'

/** The verdict of each of the four health dimensions, in display order. */
export function buildIngestVerdicts(health: IngestHealth): HealthVerdict[] {
  return [
    schedulerVerdict(health),
    mailboxesVerdict(health.mailboxes),
    processingVerdict(health.runs),
    freshnessVerdict(health.reports, health.now),
  ]
}
