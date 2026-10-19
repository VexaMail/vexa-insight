import type { ChangeDirection } from '@/types/dashboard'
import type { StatusTone } from '@/types/ui'

/** Red for bad news, green for good news, blue for neutral news. */
export function changeTone(direction: ChangeDirection): StatusTone {
  if (direction === 'worse') return 'danger'
  if (direction === 'better') return 'success'
  return 'info'
}
