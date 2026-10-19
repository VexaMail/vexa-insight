import { ArrowDown, ArrowUp, CircleCheck, Plus } from 'lucide-react'
import type { ChangeIconProps } from './ChangeIconProps'

/** Up or down for a moving figure, plus for an addition, check for a fix. */
export function ChangeIcon({ item }: Readonly<ChangeIconProps>) {
  if (item.id === 'now-compliant') return <CircleCheck />
  if (item.value.startsWith('-')) return <ArrowDown />
  if (item.direction === 'neutral') return <Plus />
  return <ArrowUp />
}
