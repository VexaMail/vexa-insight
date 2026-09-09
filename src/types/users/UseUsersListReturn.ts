import type { User } from './User'

export type UseUsersListReturn = {
  readonly users: User[]
  /** Reloads the list; a failed request is logged, not thrown. */
  readonly refreshUsers: () => Promise<void>
}
