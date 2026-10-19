import { DiagnosticsOverview } from '@/components/diagnostics'
import { EmptyState } from '@/components/ui'
import { loadDiagnosticsOverview } from '@/services/diagnostics'

/** Runs the DNS checks for every domain, behind the page's Suspense boundary. */
export async function DiagnosticsOverviewLoader() {
  const rows = await loadDiagnosticsOverview()
  if (rows.length === 0) {
    return <EmptyState>No domains found with DMARC reports.</EmptyState>
  }
  return <DiagnosticsOverview rows={rows} />
}
