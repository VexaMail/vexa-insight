import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the report loads. */
export default function ReportDetailLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading report…</LoadingPanel>
    </PageContainer>
  )
}
