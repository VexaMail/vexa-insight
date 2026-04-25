import type { StatusKind } from './StatusKind'

export const STATUS_LABELS: Record<StatusKind, string> = {
  ok: 'Valid',
  warn: 'Warning',
  error: 'Invalid',
  missing: 'Missing',
}
