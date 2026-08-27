import { PageContainer, PageHeader } from '@/components/shell'
import { UsersClient } from '@/components/users'
import { getSession } from '@/services/auth'
import { getUsers } from '@/services/users'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Users | Vexa Insight' }

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const session = await getSession()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const initialUsers = getUsers()
  const serializedUsers = initialUsers.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  }))

  return (
    <PageContainer>
      <PageHeader
        title="Users"
        description="Manage system access, roles, and domain restrictions. Only Admins can access this section."
      />
      <UsersClient
        initialUsers={serializedUsers}
        currentUserId={session.user.id}
      />
    </PageContainer>
  )
}
