import type { DiagnosticsTabHrefParams } from '@/types/diagnostics'

export function diagnosticsTabHref({
  domain,
  query,
  tab,
  anchor,
}: DiagnosticsTabHrefParams): string {
  const params = new URLSearchParams(query)
  params.set('tab', tab)
  const hash = anchor === undefined ? '' : `#${anchor}`
  return `/diagnostics/${encodeURIComponent(domain)}?${params.toString()}${hash}`
}
