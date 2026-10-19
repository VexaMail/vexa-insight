import { PageContainer, PageHeader } from '@/components/shell'
import { UsersClient } from '@/components/users'
import { getSession } from '@/services/auth'
import { getUsers } from '@/services/users'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Users' }

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
        description="Accounts, their roles and the domains each one can see. Admins only."
      />
      <UsersClient
        initialUsers={serializedUsers}
        currentUserId={session.user.id}
      />
    </PageContainer>
  )
}
