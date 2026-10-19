import type { StatusTone } from '@/types/ui'

/** Tone of an SNDS filter colour: GREEN, YELLOW, RED or missing. */
export function sndsFilterTone(filterResult: string | null): StatusTone {
  if (filterResult === 'GREEN') return 'success'
  if (filterResult === 'YELLOW') return 'warning'
  if (filterResult === 'RED') return 'danger'
  return 'neutral'
}
