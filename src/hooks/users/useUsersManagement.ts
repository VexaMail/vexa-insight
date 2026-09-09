import type { User, UseUsersManagementReturn } from '@/types/users'
import { deleteUser } from '@/utils/users'
import { useUserDialogs } from './useUserDialogs'
import { useUsersList } from './useUsersList'

export function useUsersManagement(
  initialUsers: User[],
): UseUsersManagementReturn {
  const { users, refreshUsers } = useUsersList(initialUsers)
  const dialogs = useUserDialogs()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    const failure = await deleteUser(id)
    if (failure !== null) {
      alert(`Error: ${failure}`)
    } else {
      void refreshUsers()
    }
  }

  const onSuccessCreate = () => {
    dialogs.closeCreate()
    void refreshUsers()
  }

  const onSuccessEdit = () => {
    dialogs.closeEdit()
    void refreshUsers()
  }

  return { ...dialogs, users, handleDelete, onSuccessCreate, onSuccessEdit }
}
