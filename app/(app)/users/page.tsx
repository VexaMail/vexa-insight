import { UsersClient } from '@/components/users'
import { getSession } from '@/services/auth'
import { getUsers } from '@/services/users'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Users | Vexa Insight' }

export default async function UsersPage() {
  const session = await getSession()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  // Serialize the date objects to strings to pass safely to Client Component if necessary, or let Next.js handle it
  const initialUsers = await getUsers()
  const serializedUsers = initialUsers.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  }))

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h1 className="font-display text-foreground text-3xl font-bold tracking-tight">
        Users
      </h1>
      <p className="text-muted-foreground text-sm">
        Manage system access, roles, and domain restrictions. Only Admins can
        access this section.
      </p>
      <div className="pt-4">
        <UsersClient
          initialUsers={serializedUsers}
          currentUserId={session.user.id}
        />
      </div>
    </div>
  )
}
