import type { User, UseUserDialogsReturn } from '@/types/users'
import { useState } from 'react'

/** Open state of the create and edit dialogs, and the user being edited. */
export function useUserDialogs(): UseUserDialogsReturn {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const closeCreate = () => {
    setIsCreateOpen(false)
  }

  const closeEdit = () => {
    setIsEditOpen(false)
    setSelectedUser(null)
  }

  return {
    isCreateOpen,
    setIsCreateOpen,
    isEditOpen,
    selectedUser,
    handleEditUser,
    closeCreate,
    closeEdit,
  }
}
