import type { DnsDiagnostics } from '@/types/diagnostics'

import type { StatusKind } from './StatusKind'

export type DkimView = {
  status: StatusKind
  label: string
  selectors: DnsDiagnostics['dkim']
  validSelectors: DnsDiagnostics['dkim']
}
