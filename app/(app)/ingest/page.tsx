import type { Metadata } from 'next'

import {
  CronsSection,
  IngestStoreProvider,
  JobRunHistoryTable,
  ProcessedEmailsTable,
} from '@/components/ingest'
import { PageContainer, PageHeader } from '@/components/shell'
import { requirePageSession } from '@/services/auth'
import { getIngestPageData } from '@/services/ingest'
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
    settings,
    serializedEmails,
    isHistoricalJobContext,
    effectiveJobId,
  } = await getIngestPageData(jobId)

  return (
    <PageContainer>
      <PageHeader
        title="Ingest"
        description="Track ingestion jobs, processed emails, and scheduled crons."
      />
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
    </PageContainer>
  )
}
