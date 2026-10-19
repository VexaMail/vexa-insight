import type { IngestEngineSectionProps } from '@/types/ingest'
import { buildIngestInitialState } from '@/utils/ingest'
import { ConfigureMailboxAction } from './ConfigureMailboxAction'
import CronsSection from './CronsSection'
import { IngestHealthFacts } from './IngestHealthFacts'
import { IngestHealthPanel } from './IngestHealthPanel'
import { IngestOverallPill } from './IngestOverallPill'
import { IngestStoreProvider } from './IngestStoreProvider'
import JobRunHistoryTable from './JobRunHistoryTable'
import ProcessedEmailsTable from './ProcessedEmailsTable'

/** Ingestion health with its actions, the health checks, then the run logs. */
export function IngestEngineSection({
  health,
  activity,
  pollStatus,
  displayPollStatus,
  jobRuns,
  emails,
  isHistoricalJobContext,
  jobId,
  intervalMinutes,
  initialApiKey,
  canConfigure,
}: Readonly<IngestEngineSectionProps>) {
  return (
    <IngestStoreProvider
      initialState={buildIngestInitialState(displayPollStatus, jobId)}
    >
      <CronsSection
        ingestionIntervalMinutes={intervalMinutes}
        initialApiKey={initialApiKey}
        isHistoricalJobContext={isHistoricalJobContext}
        jobId={jobId}
        healthPill={<IngestOverallPill health={health} />}
        healthFacts={
          <IngestHealthFacts
            health={health}
            activity={activity}
            canConfigure={canConfigure}
          />
        }
        healthChecks={<IngestHealthPanel health={health} />}
        jobRunsNode={
          <JobRunHistoryTable
            key="jobs"
            runs={jobRuns}
            activeJobRunId={pollStatus.activeJobRunId}
          />
        }
        processedEmailsNode={
          <ProcessedEmailsTable key="emails" emails={emails} />
        }
        idleAction={
          health.mailboxes.length === 0 ? (
            <ConfigureMailboxAction canConfigure={canConfigure} />
          ) : undefined
        }
      />
    </IngestStoreProvider>
  )
}
