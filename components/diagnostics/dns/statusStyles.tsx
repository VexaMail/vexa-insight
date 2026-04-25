import type { StatusKind } from '@/lib/diagnostics'

export const STATUS_STYLES: Record<StatusKind, string> = {
  ok: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warn: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  missing: 'bg-muted text-muted-foreground',
}
