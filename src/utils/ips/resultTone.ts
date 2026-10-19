import type { StatusTone } from '@/types/ui'

/** Success for `pass`, warning for a soft or empty result, danger for `fail`. */
export function resultTone(result: string): StatusTone {
  if (result === 'pass') return 'success'
  if (result === 'fail' || result === 'permerror') return 'danger'
  return 'warning'
}
