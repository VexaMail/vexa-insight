import type { Metadata } from 'next'

import {
  CronsSection,
  IngestStoreProvider,
  JobRunHistoryTable,
  ProcessedEmailsTable,
} from '@/components/ingest'
import { PageContainer, PageHeader } from '@/components/shell'
import { getIngestPageData } from '@/services/ingest'

export const metadata: Metadata = {
  title: 'Ingest | Vexa Insight',
  description: 'DMARC Ingestion Management',
}

export const dynamic = 'force-dynamic'

export default async function IngestPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ jobId?: string; hideEmpty?: string }>
}) {
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
        initialState={{
          selectedJobId: effectiveJobId ?? null,
          isRunning: displayPollStatus.isRunning,
          lastCheck: displayPollStatus.lastCheck,
          currentProcessed: displayPollStatus.currentProcessed,
          totalEmails: displayPollStatus.totalEmails,
          processingEmails: displayPollStatus.processingEmails,
          etaMs: displayPollStatus.etaMs,
          progressItems: displayPollStatus.progressItems.items,
          progressTotal: displayPollStatus.progressItems.total,
          pageSize: displayPollStatus.progressItems.pageSize,
          page: displayPollStatus.progressItems.page,
        }}
      >
        <CronsSection
          ingestionIntervalMinutes={settings?.ingestionIntervalMinutes ?? 60}
          initialApiKey={settings?.secretKey ?? ''}
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
