import { DiagnosticsOverview } from '@/components/diagnostics'
import { EmptyState } from '@/components/ui'
import { loadDiagnosticsOverview } from '@/services/diagnostics'

/** Reads every domain's stored DNS run, behind the page's Suspense boundary. */
export async function DiagnosticsOverviewLoader() {
  const rows = await loadDiagnosticsOverview()
  if (rows.length === 0) {
    return <EmptyState>No domains found with DMARC reports.</EmptyState>
  }
  return <DiagnosticsOverview rows={rows} />
}
