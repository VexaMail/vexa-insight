import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the sending sources loads. */
export default function IpsLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">Loading sending sources…</LoadingPanel>
    </PageContainer>
  )
}
