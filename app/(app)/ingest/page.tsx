import type { Metadata } from 'next'

import { IngestActivityChart } from '@/components/charts'
import {
  CronsSection,
  IngestHealthPanel,
  IngestStoreProvider,
  JobRunHistoryTable,
  ProcessedEmailsTable,
} from '@/components/ingest'
import { PageContainer, PageHeader } from '@/components/shell'
import { requirePageSession } from '@/services/auth'
import { getIngestHealth, getIngestPageData } from '@/services/ingest'
import type { IngestPageProps } from '@/types/ingest'
import { adminOnlyApiKey, buildIngestInitialState } from '@/utils/ingest'

export const metadata: Metadata = {
  title: 'Ingest',
  description: 'DMARC Ingestion Management',
}

export const dynamic = 'force-dynamic'

export default async function IngestPage({ searchParams }: IngestPageProps) {
  const session = await requirePageSession()
  const params = await searchParams
  const jobId = params.jobId ? parseInt(params.jobId, 10) : undefined

  const {
    pollStatus,
    displayPollStatus,
    jobRuns,
    activity,
    settings,
    serializedEmails,
    isHistoricalJobContext,
    effectiveJobId,
  } = await getIngestPageData(jobId)
  const health = await getIngestHealth(pollStatus.isRunning)

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        eyebrow="Operate"
        title="Ingestion"
        description="Whether reports are still arriving: the scheduler, each mailbox, every run and the age of the newest data."
      />

      <IngestHealthPanel health={health} />

      <IngestStoreProvider
        initialState={buildIngestInitialState(
          displayPollStatus,
          effectiveJobId,
        )}
      >
        <CronsSection
          ingestionIntervalMinutes={settings?.ingestionIntervalMinutes ?? 60}
          initialApiKey={adminOnlyApiKey(session.user.role, settings?.apiToken)}
          isHistoricalJobContext={isHistoricalJobContext}
          jobId={effectiveJobId}
          jobRunsNode={
            <JobRunHistoryTable
              key="jobs"
              runs={jobRuns}
              activeJobRunId={pollStatus.activeJobRunId}
            />
          }
          processedEmailsNode={
            <ProcessedEmailsTable key="emails" emails={serializedEmails} />
          }
        />
      </IngestStoreProvider>

      <IngestActivityChart data={activity} />
    </PageContainer>
  )
}
