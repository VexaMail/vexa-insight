import type { ActionItem } from '@/types/dashboard'

export type ActionQueueGroupProps = {
  readonly title: string
  readonly items: ActionItem[]
  readonly emptyText: string
}
