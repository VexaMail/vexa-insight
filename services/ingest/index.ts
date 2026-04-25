import { getJobRunHistory, getPollStatus } from '@/services/job'
import { getProcessedMessages } from '@/services/processed-messages'
import { getSettingsForAdmin } from '@/services/settings'

export async function getIngestPageData(jobId?: number) {
  const [pollStatus, jobRuns, settings] = await Promise.all([
    getPollStatus(),
    getJobRunHistory(50),
    Promise.resolve(getSettingsForAdmin()),
  ])

  let effectiveJobId = jobId
  if (!effectiveJobId && !pollStatus.isRunning && jobRuns.length > 0) {
    effectiveJobId = jobRuns[0]?.id
  }

  const processedEmails = await getProcessedMessages(50, effectiveJobId)

  const serializedEmails = processedEmails.map((e) => ({
    id: e.id,
    messageId: e.messageId,
    processedAt: e.processedAt.toISOString(),
    accountLabel: e.accountLabel,
    jobRunId: e.jobRunId,
  }))

  let displayPollStatus = pollStatus
  let isHistoricalJobContext = false

  if (effectiveJobId) {
    const historicalRun = jobRuns.find((r) => r.id === effectiveJobId)
    if (historicalRun && effectiveJobId !== pollStatus.activeJobRunId) {
      isHistoricalJobContext = true
      const historicalPollStatus = await getPollStatus(1, 50, effectiveJobId)
      displayPollStatus = {
        ...historicalPollStatus,
        isRunning: false,
        lastCheck: historicalRun.runAt.toISOString(),
        currentProcessed: historicalRun.processed,
        totalEmails: historicalRun.processed,
        processingEmails: 0,
        etaMs: 0,
      }
    }
  }

  return {
    pollStatus,
    displayPollStatus,
    jobRuns,
    settings,
    serializedEmails,
    isHistoricalJobContext,
    effectiveJobId,
  }
}
