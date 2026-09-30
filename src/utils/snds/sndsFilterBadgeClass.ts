/** Tailwind classes for an SNDS filter result (GREEN, YELLOW, RED). */
export function sndsFilterBadgeClass(filterResult: string | null): string {
  if (filterResult === 'GREEN')
    return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
  if (filterResult === 'YELLOW')
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
  if (filterResult === 'RED')
    return 'bg-red-500/15 text-red-700 dark:text-red-400'
  return 'bg-muted text-muted-foreground'
}
