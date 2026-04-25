export const STATUS_CONFIG = {
  healthy: {
    label: 'Healthy',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  'needs-review': {
    label: 'Needs Review',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  failing: {
    label: 'Failing',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
} as const
