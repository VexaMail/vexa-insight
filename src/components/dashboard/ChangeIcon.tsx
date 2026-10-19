import { ArrowDown, ArrowUp, CircleCheck, Plus } from 'lucide-react'
import type { ChangeListRowProps } from './ChangeListRowProps'

/** Up or down for a moving figure, plus for an addition, check for a fix. */
export function ChangeIcon({ item }: Readonly<ChangeListRowProps>) {
  if (item.id === 'now-compliant') return <CircleCheck />
  if (item.value.startsWith('-')) return <ArrowDown />
  if (item.direction === 'neutral') return <Plus />
  return <ArrowUp />
}
