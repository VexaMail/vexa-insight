import type { User } from './User'

export type UseUsersColumnsParams = {
  currentUserId: string
  onDelete: (id: string) => Promise<void>
  onEdit: (user: User) => void
}
