import type { User } from '@/types/users'

export type GetUsersColumnsParams = {
  readonly currentUserId: string
  readonly onDelete: (id: string) => Promise<void>
  readonly onEdit: (user: User) => void
}
