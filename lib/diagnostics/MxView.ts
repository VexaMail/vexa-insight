import type { DnsDiagnostics } from '@/types/diagnostics'

import type { StatusKind } from './StatusKind'

export type MxView = {
  status: StatusKind
  label: string
  records: DnsDiagnostics['mx']
}
