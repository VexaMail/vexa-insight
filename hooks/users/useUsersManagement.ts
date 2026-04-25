import { useState } from 'react'

import type { User } from '@/types/users'

export function useUsersManagement(initialUsers: User[]) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    const res = await fetch('/api/v1/users')
    if (res.ok) {
      const json = await res.json()
      setUsers(json.data)
    }
  }

  const refreshUsersWrapper = async () => {
    try {
      await fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    const res = await fetch(`/api/v1/users/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const err = await res.json()
      alert('Error: ' + err.error?.message)
    } else {
      void refreshUsersWrapper()
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const closeCreate = () => setIsCreateOpen(false)

  const closeEdit = () => {
    setIsEditOpen(false)
    setSelectedUser(null)
  }

  const onSuccessCreate = () => {
    setIsCreateOpen(false)
    void refreshUsersWrapper()
  }

  const onSuccessEdit = () => {
    setIsEditOpen(false)
    setSelectedUser(null)
    void refreshUsersWrapper()
  }

  return {
    users,
    isCreateOpen,
    setIsCreateOpen,
    isEditOpen,
    selectedUser,
    handleDelete,
    handleEditUser,
    closeCreate,
    closeEdit,
    onSuccessCreate,
    onSuccessEdit,
  }
}
