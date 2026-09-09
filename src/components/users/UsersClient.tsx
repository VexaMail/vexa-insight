'use client'

import { DataTable } from '@/components/ui'
import { useUsersManagement } from '@/hooks/users'
import { CreateUserButton } from './CreateUserButton'
import { UserDialogs } from './UserDialogs'
import type { UsersClientProps } from './UsersClientProps'
import { getUsersColumns } from './usersColumns'

export default function UsersClient({
  initialUsers,
  currentUserId,
}: Readonly<UsersClientProps>) {
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

  const columns = getUsersColumns({
    currentUserId,
    onEdit: handleEditUser,
    onDelete: handleDelete,
  })

  return (
    <div className="space-y-4">
      <CreateUserButton
        onClick={() => {
          setIsCreateOpen(true)
        }}
      />

      <DataTable columns={columns} data={users} />

      <UserDialogs
        isCreateOpen={isCreateOpen}
        isEditOpen={isEditOpen}
        selectedUser={selectedUser}
        closeCreate={closeCreate}
        closeEdit={closeEdit}
        onSuccessCreate={onSuccessCreate}
        onSuccessEdit={onSuccessEdit}
      />
    </div>
  )
}
