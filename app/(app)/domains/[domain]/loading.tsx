import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the domain's report data loads. */
export default function DomainDetailLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading domain…</LoadingPanel>
    </PageContainer>
  )
}
