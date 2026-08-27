import { getDb, users } from '@/lib/db'

export function getUsers() {
  const db = getDb()
  const allUsers = db
    .select({
      id: users.id,
      username: users.username,
      role: users.role,
      allowedDomains: users.allowedDomains,
      theme: users.theme,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .all()

  return allUsers
}
