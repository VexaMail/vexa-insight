import type { DnsDiagnostics } from '@/types/diagnostics'

import type { DmarcView } from './DmarcView'
import { STATUS_LABELS } from './statusLabels'

export function getDmarcView(data: DnsDiagnostics): DmarcView {
  // Regex-based detection — more reliable than string includes
  const reportingEnabled = Boolean(
    data.dmarc?.match(/(?:^|;)\s*(rua|ruf)\s*=/i),
  )

  let status: 'ok' | 'warn' | 'error' | 'missing'
  if (!data.dmarc) {
    status = 'missing'
  } else if (data.dmarcPolicy === 'none') {
    status = 'warn'
  } else if (data.dmarcValid) {
    status = 'ok'
  } else {
    status = 'error'
  }

  const label =
    status === 'warn' && data.dmarcPolicy === 'none'
      ? 'Policy: none'
      : STATUS_LABELS[status]

  return {
    status,
    label,
    value: data.dmarc,
    policy: data.dmarcPolicy,
    reportingEnabled,
  }
}
