import type { ChangeItem } from '@/types/dashboard'

export type ChangeListRowProps = {
  readonly item: ChangeItem
  readonly nowMs: number
}
