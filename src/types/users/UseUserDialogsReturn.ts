import type { User } from './User'

export type UseUserDialogsReturn = {
  readonly isCreateOpen: boolean
  readonly setIsCreateOpen: (open: boolean) => void
  readonly isEditOpen: boolean
  readonly selectedUser: User | null
  readonly handleEditUser: (user: User) => void
  readonly closeCreate: () => void
  readonly closeEdit: () => void
}
