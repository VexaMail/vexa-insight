'use client'

import { useRefreshOnCronsStop } from '@/hooks/ingest'
import type { CronsSectionProps } from '@/types/ingest'
import { m as motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAbortPoll } from '../../hooks/ingest/useAbortPoll'
import { useCronsSectionViewModel } from '../../hooks/ingest/useCronsSectionViewModel'
import { usePollStatusFetcher } from '../../hooks/ingest/usePollStatusFetcher'
import { EngineHeader } from './EngineHeader'
import { EngineProgress } from './EngineProgress'
import { EngineSummary } from './EngineSummary'
import IngestTabs from './IngestTabs'
import PollProgressList from './PollProgressList'

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

  const {
    isRunning,
    runRequested,
    currentProcessed,
    totalEmails,
    processingEmails,
    page,
    pageSize,
    progressItems,
    progressTotal,
    applyPollStatusData,
    lastRunFormatted,
    scheduleText,
    ratePerSecond,
    etaFormatted,
    statusText,
  } = useCronsSectionViewModel(ingestionIntervalMinutes)

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

  const isActive = isRunning || runRequested

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card-hover p-5"
      >
        <EngineHeader
          initialApiKey={initialApiKey}
          isRunning={isRunning}
          runRequested={runRequested}
          abortStatus={abortStatus}
          onAbort={() => {
            void handleAbort()
          }}
        />
        <EngineSummary
          scheduleText={scheduleText}
          lastRunFormatted={lastRunFormatted}
          currentProcessed={currentProcessed}
          isRunning={isRunning}
          runRequested={runRequested}
        />

        {isActive ? (
          <EngineProgress
            currentProcessed={currentProcessed}
            totalEmails={totalEmails}
            processingEmails={processingEmails}
            ratePerSecond={ratePerSecond}
            etaFormatted={etaFormatted}
            statusText={statusText}
          />
        ) : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card-hover p-4 sm:p-5"
      >
        <IngestTabs
          jobRunsNode={jobRunsNode}
          processedEmailsNode={processedEmailsNode}
          isHistoricalJobContext={isHistoricalJobContext}
          pollProgressNode={
            progressItems.length > 0 || progressTotal > 0 ? (
              <PollProgressList />
            ) : undefined
          }
        />
      </motion.div>
    </div>
  )
}
