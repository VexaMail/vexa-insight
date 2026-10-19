import type { Metadata } from 'next'

import { IngestActivityChart } from '@/components/charts'
import { IngestEngineSection, IngestKpiTiles } from '@/components/ingest'
import { PageContainer, PageHeader } from '@/components/shell'
import { requirePageSession } from '@/services/auth'
import { getIngestHealth, getIngestPageData } from '@/services/ingest'
import type { IngestPageProps } from '@/types/ingest'
import { adminOnlyApiKey } from '@/utils/ingest'

export const metadata: Metadata = {
  title: 'Ingest',
  description: 'DMARC Ingestion Management',
}

export const dynamic = 'force-dynamic'

export default async function IngestPage({ searchParams }: IngestPageProps) {
  const session = await requirePageSession()
  const params = await searchParams
  const jobId = params.jobId ? parseInt(params.jobId, 10) : undefined

  const data = await getIngestPageData(jobId)
  const health = await getIngestHealth(data.pollStatus.isRunning)

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        eyebrow="Operate"
        title="Ingestion"
        description="Whether reports are still arriving: the scheduler, each mailbox, every run and the age of the newest data."
      />
      <IngestKpiTiles health={health} activity={data.activity} />
      <IngestEngineSection
        health={health}
        activity={data.activity}
        pollStatus={data.pollStatus}
        displayPollStatus={data.displayPollStatus}
        jobRuns={data.jobRuns}
        emails={data.serializedEmails}
        isHistoricalJobContext={data.isHistoricalJobContext}
        jobId={data.effectiveJobId}
        intervalMinutes={data.settings?.ingestionIntervalMinutes ?? 60}
        initialApiKey={adminOnlyApiKey(
          session.user.role,
          data.settings?.apiToken,
        )}
      />
      <IngestActivityChart data={data.activity} />
    </PageContainer>
  )
}
