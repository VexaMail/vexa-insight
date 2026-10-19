import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the domain summary loads. */
export default function DomainsLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading domains…</LoadingPanel>
    </PageContainer>
  )
}
