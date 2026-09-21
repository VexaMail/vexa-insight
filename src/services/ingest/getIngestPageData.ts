import {
  getIngestActivity,
  getJobRunHistory,
  getPollStatus,
} from '@/services/job'
import { getProcessedMessages } from '@/services/processed-messages'
import { getSettingsForAdmin } from '@/services/settings'
import { resolveHistoricalPollStatus } from './resolveHistoricalPollStatus'
import { serializeProcessedEmails } from './serializeProcessedEmails'

/**
 * Everything the ingest page renders. Without an explicit jobId the page shows
 * the whole picture — the latest runs, the most recent emails across runs and
 * the activity chart — instead of scoping itself to the last run, which is
 * usually empty because a poll that found no new mail still creates a run.
 */
export async function getIngestPageData(jobId?: number) {
  const [pollStatus, jobRuns, activity, settings] = await Promise.all([
    getPollStatus(),
    getJobRunHistory(50),
    getIngestActivity(30),
    Promise.resolve(getSettingsForAdmin()),
  ])

  const selectedJobId = jobId ?? pollStatus.activeJobRunId ?? undefined
  const selectedRun = jobRuns.find((run) => run.id === selectedJobId) ?? null

  const serializedEmails = serializeProcessedEmails(
    await getProcessedMessages(50, jobId),
  )

  const isHistoricalJobContext =
    selectedRun !== null && selectedRun.id !== pollStatus.activeJobRunId

  const displayPollStatus = isHistoricalJobContext
    ? await resolveHistoricalPollStatus(selectedRun)
    : pollStatus

  return {
    pollStatus,
    displayPollStatus,
    jobRuns,
    activity,
    settings,
    serializedEmails,
    selectedRun,
    isHistoricalJobContext,
    effectiveJobId: selectedJobId,
  }
}
