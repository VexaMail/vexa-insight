import type { DnsDiagnostics } from '@/types/diagnostics'

import type { SpfView } from './SpfView'
import { STATUS_LABELS } from './statusLabels'

export function getSpfView(data: DnsDiagnostics): SpfView {
  let status: 'ok' | 'warn' | 'error' | 'missing'
  if (!data.spf) {
    status = 'missing'
  } else if (data.spfWarning) {
    status = 'warn'
  } else if (data.spfValid) {
    status = 'ok'
  } else {
    status = 'error'
  }

  return {
    status,
    label: STATUS_LABELS[status],
    value: data.spf,
    warning: data.spfWarning,
  }
}
