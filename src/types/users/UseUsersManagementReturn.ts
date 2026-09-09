import type { User } from './User'
import type { UseUserDialogsReturn } from './UseUserDialogsReturn'

export type UseUsersManagementReturn = UseUserDialogsReturn & {
  readonly users: User[]
  readonly handleDelete: (id: string) => Promise<void>
  readonly onSuccessCreate: () => void
  readonly onSuccessEdit: () => void
}
