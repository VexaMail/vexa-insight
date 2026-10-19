import { PageContainer } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'

/** Shown at once on navigation while the domain's DNS checks run. */
export default function DomainDiagnosticsLoading() {
  return (
    <PageContainer>
      <LoadingPanel className="min-h-96">
        Running DNS checks for this domain…
      </LoadingPanel>
    </PageContainer>
  )
}
