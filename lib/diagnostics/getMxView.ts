import type { DnsDiagnostics } from '@/types/diagnostics'

import type { MxView } from './MxView'

export function getMxView(data: DnsDiagnostics): MxView {
  const hasRecords = data.mx.length > 0
  const status: 'ok' | 'missing' = hasRecords ? 'ok' : 'missing'
  const label = hasRecords ? `${data.mx.length} record(s)` : 'Missing'

  return {
    status,
    label,
    records: data.mx,
  }
}
