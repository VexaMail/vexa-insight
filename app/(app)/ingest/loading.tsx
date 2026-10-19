import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the ingest status loads. */
export default function IngestLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading ingest status…</LoadingPanel>
    </PageContainer>
  )
}
