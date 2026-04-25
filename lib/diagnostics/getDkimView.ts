import type { DnsDiagnostics } from '@/types/diagnostics'

import type { DkimView } from './DkimView'

export function getDkimView(data: DnsDiagnostics): DkimView {
  const validSelectors = data.dkim.filter((item) => item.valid)
  const hasSelectors = data.dkim.length > 0

  // Semantic distinction: missing (no selectors probed) vs error (selectors found but all invalid)
  let status: 'ok' | 'warn' | 'error' | 'missing'
  if (!hasSelectors) {
    status = 'missing'
  } else if (validSelectors.length > 0) {
    status = 'ok'
  } else {
    status = 'error'
  }

  let label: string
  if (validSelectors.length > 0) {
    label = `${validSelectors.length} selector(s)`
  } else if (hasSelectors) {
    label = 'Invalid'
  } else {
    label = 'Not found'
  }

  return {
    status,
    label,
    selectors: data.dkim,
    validSelectors,
  }
}
