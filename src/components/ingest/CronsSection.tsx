'use client'

import { useRefreshOnCronsStop } from '@/hooks/ingest'
import type { CronsSectionProps } from '@/types/ingest'
import { useRouter } from 'next/navigation'
import { useAbortPoll } from '../../hooks/ingest/useAbortPoll'
import { useCronsSectionViewModel } from '../../hooks/ingest/useCronsSectionViewModel'
import { usePollStatusFetcher } from '../../hooks/ingest/usePollStatusFetcher'
import { CronsEngineCard } from './CronsEngineCard'
import { CronsTabsCard } from './CronsTabsCard'

export default function CronsSection({
  ingestionIntervalMinutes,
  initialApiKey = '',
  isHistoricalJobContext = false,
  jobId,
  jobRunsNode,
  processedEmailsNode,
}: Readonly<CronsSectionProps>) {
  const router = useRouter()
  const { abortStatus, handleAbort } = useAbortPoll(initialApiKey)
  const viewModel = useCronsSectionViewModel(ingestionIntervalMinutes)
  const {
    isRunning,
    runRequested,
    page,
    pageSize,
    progressItems,
    progressTotal,
    applyPollStatusData,
  } = viewModel

  useRefreshOnCronsStop(isRunning, router)

  usePollStatusFetcher({
    isHistoricalJobContext,
    jobId,
    page,
    pageSize,
    isRunning,
    runRequested,
    abortStatus,
    applyPollStatusData,
  })

  return (
    <div className="space-y-6">
      <CronsEngineCard
        initialApiKey={initialApiKey}
        isRunning={isRunning}
        runRequested={runRequested}
        abortStatus={abortStatus}
        onAbort={() => {
          void handleAbort()
        }}
        scheduleText={viewModel.scheduleText}
        lastRunFormatted={viewModel.lastRunFormatted}
        currentProcessed={viewModel.currentProcessed}
        totalEmails={viewModel.totalEmails}
        processingEmails={viewModel.processingEmails}
        ratePerSecond={viewModel.ratePerSecond}
        etaFormatted={viewModel.etaFormatted}
        statusText={viewModel.statusText}
      />
      <CronsTabsCard
        jobRunsNode={jobRunsNode}
        processedEmailsNode={processedEmailsNode}
        isHistoricalJobContext={isHistoricalJobContext}
        showPollProgress={progressItems.length > 0 || progressTotal > 0}
      />
    </div>
  )
}
