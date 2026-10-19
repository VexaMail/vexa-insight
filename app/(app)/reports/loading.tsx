import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the report list loads. */
export default function ReportsLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading reports…</LoadingPanel>
    </PageContainer>
  )
}
