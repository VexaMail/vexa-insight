'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'
import { useRefreshOnCronsStop } from '@/hooks/ingest'
import type { CronsSectionProps } from '@/types/ingest'
import { m as motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useAbortPoll } from '../../hooks/ingest/useAbortPoll'
import { useCronsSectionViewModel } from '../../hooks/ingest/useCronsSectionViewModel'
import { usePollStatusFetcher } from '../../hooks/ingest/usePollStatusFetcher'
import { EngineProgress } from './EngineProgress'
import { EngineStatusIndicator } from './EngineStatusIndicator'
import IngestTabs from './IngestTabs'
import PollProgressList from './PollProgressList'
import TriggerPollForm from './TriggerPollForm'

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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card-hover p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-primary h-4 w-4" />
            <h3 className="font-display text-foreground text-sm font-semibold">
              DMARC Ingest Engine
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {!(isRunning || runRequested) ? (
              <TriggerPollForm
                className="m-0"
                hideApiKeyWhenPrefilled
                initialApiKey={initialApiKey}
              />
            ) : (
              <Button
                variant="destructive"
                size="sm"
                className="h-8 gap-1.5 px-3 text-xs"
                onClick={() => {
                  void handleAbort()
                }}
                disabled={abortStatus === 'loading' || !initialApiKey.trim()}
                title={
                  !initialApiKey.trim()
                    ? 'Set API key in settings to stop the job'
                    : undefined
                }
                aria-label="Stop running ingest job"
              >
                {abortStatus === 'loading' ? 'Canceling…' : 'Stop process'}
              </Button>
            )}
            <EngineStatusIndicator
              abortStatus={abortStatus}
              isRunning={isRunning}
              runRequested={runRequested}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Schedule</span>
            <span className="text-foreground font-medium">{scheduleText}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last run</span>
            <span className="text-foreground font-medium">
              {lastRunFormatted}
            </span>
          </div>
          {(isRunning === true || runRequested === true) && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processed</span>
              <span className="text-foreground font-medium">
                {currentProcessed.toLocaleString()}
                {runRequested && !isRunning ? ' (starting…)' : ''}
              </span>
            </div>
          )}
        </div>

        {(isRunning === true || runRequested === true) && (
          <EngineProgress
            currentProcessed={currentProcessed}
            totalEmails={totalEmails}
            processingEmails={processingEmails}
            ratePerSecond={ratePerSecond}
            etaFormatted={etaFormatted}
            statusText={statusText}
          />
        )}
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
