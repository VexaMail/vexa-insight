import { formatEta, formatPollStatusTime } from '@/utils/format'
import { computeProgressRateAndEta } from '@/utils/ingest'

import { useIngestContext } from './useIngestContext'

export function useCronsSectionViewModel(ingestionIntervalMinutes: number) {
  const isRunning = useIngestContext((s) => s.isRunning)
  const lastCheck = useIngestContext((s) => s.lastCheck)
  const currentProcessed = useIngestContext((s) => s.currentProcessed)
  const totalEmails = useIngestContext((s) => s.totalEmails)
  const processingEmails = useIngestContext((s) => s.processingEmails)
  const etaMs = useIngestContext((s) => s.etaMs)
  const runRequested = useIngestContext((s) => s.runRequested)
  const page = useIngestContext((s) => s.page)
  const pageSize = useIngestContext((s) => s.pageSize)
  const progressItems = useIngestContext((s) => s.progressItems)
  const progressTotal = useIngestContext((s) => s.progressTotal)
  const jobStartTime = useIngestContext((s) => s.jobStartTime)
  const applyPollStatusData = useIngestContext((s) => s.applyPollStatus)
  const abortStatus = useIngestContext((s) => s.abortStatus)
  const statusText = useIngestContext((s) => s.statusText)

  let lastCheckString = ''
  if (lastCheck) {
    lastCheckString =
      typeof lastCheck === 'string' ? lastCheck : lastCheck.toISOString()
  }
  const lastRunFormatted = lastCheck
    ? formatPollStatusTime(lastCheckString)
    : 'Never'

  let scheduleText = 'Disabled'
  if (ingestionIntervalMinutes >= 1) {
    scheduleText = `Every ${String(ingestionIntervalMinutes)} minute${ingestionIntervalMinutes === 1 ? '' : 's'}`
  }

  const { ratePerSecond, etaFormatted: clientEtaFormatted } =
    computeProgressRateAndEta(currentProcessed, totalEmails, jobStartTime)
  const etaFormatted = ratePerSecond > 0 ? clientEtaFormatted : formatEta(etaMs)

  return {
    isRunning,
    runRequested,
    currentProcessed,
    totalEmails,
    processingEmails,
    page,
    pageSize,
    progressItems,
    progressTotal,
    abortStatus,
    applyPollStatusData,
    lastRunFormatted,
    scheduleText,
    ratePerSecond,
    etaFormatted,
    statusText,
  }
}
