'use client'

import type { CronsSectionProps } from '@/types/ingest'
import { useCronsSection } from '../../hooks/ingest/useCronsSection'
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
  const { viewModel, abortStatus, handleAbort } = useCronsSection({
    ingestionIntervalMinutes,
    initialApiKey,
    isHistoricalJobContext,
    jobId,
  })
  const { isRunning, runRequested, progressItems, progressTotal } = viewModel

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
