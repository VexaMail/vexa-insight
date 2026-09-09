import type { User } from '@/types/users'

export type UsersClientProps = {
  readonly initialUsers: User[]
  readonly currentUserId: string
}
