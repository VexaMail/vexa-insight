import type { User, UseUsersListReturn } from '@/types/users'
import { fetchUsers } from '@/utils/users'
import { useState } from 'react'

export function useUsersList(initialUsers: User[]): UseUsersListReturn {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const refreshUsers = async () => {
    try {
      const next = await fetchUsers()
      if (next !== null) setUsers(next)
    } catch (err) {
      console.error(err)
    }
  }

  return { users, refreshUsers }
}
