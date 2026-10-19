import type { StatusTone } from '@/types/ui'

/**
 * Soft pill colours per tone; text stays at full token colour for contrast.
 * The dark theme tints a little stronger, because a 10% tint on navy reads
 * fainter than the same tint on white and the soft pill would lose its rank.
 */
export const STATUS_TONE_CLASSES: Record<StatusTone, string> = {
  success:
    'border-success/30 bg-success/10 text-success dark:border-success/40 dark:bg-success/15',
  warning:
    'border-warning/35 bg-warning/10 text-warning dark:border-warning/45 dark:bg-warning/15',
  danger:
    'border-danger/35 bg-danger/10 text-danger dark:border-danger/45 dark:bg-danger/15',
  info: 'border-info/30 bg-info/10 text-info dark:border-info/40 dark:bg-info/15',
  unknown:
    'border-unknown/30 bg-unknown/10 text-unknown dark:border-unknown/40 dark:bg-unknown/15',
  neutral: 'border-border bg-secondary text-muted-foreground',
}
