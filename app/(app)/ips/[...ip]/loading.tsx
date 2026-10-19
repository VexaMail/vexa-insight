import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the address's report data loads. */
export default function IpDetailLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading IP address…</LoadingPanel>
    </PageContainer>
  )
}
