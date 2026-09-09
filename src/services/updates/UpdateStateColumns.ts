import type { updateState } from '@/lib/db'

/**
 * The writable columns of the update_state row, each optional.
 */
export type UpdateStateColumns = Partial<
  Omit<typeof updateState.$inferInsert, 'id' | 'updatedAt'>
>
