import type { StatusKind } from '@/lib/diagnostics'

export const STATUS_ICONS: Record<StatusKind, string> = {
  ok: '✓',
  warn: '⚠',
  error: '✗',
  missing: '–',
}
