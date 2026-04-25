'use client'

import { Button, DataTable } from '@/components/ui'
import { Plus } from 'lucide-react'
import UserModal from './UserModal'

import { useUsersColumns } from '@/hooks/users'
import type { User } from '@/types/users'
import { useUsersManagement } from '../../hooks/users/useUsersManagement'

export default function UsersClient({
  initialUsers,
  currentUserId,
}: Readonly<{
  initialUsers: User[]
  currentUserId: string
}>) {
  const {
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
  } = useUsersManagement(initialUsers)

  const columns = useUsersColumns({
    currentUserId,
    onEdit: handleEditUser,
    onDelete: handleDelete,
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create User
        </Button>
      </div>

      <DataTable columns={columns} data={users} />

      {isCreateOpen && (
        <UserModal onClose={closeCreate} onSuccess={onSuccessCreate} />
      )}
      {isEditOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={closeEdit}
          onSuccess={onSuccessEdit}
        />
      )}
    </div>
  )
}
