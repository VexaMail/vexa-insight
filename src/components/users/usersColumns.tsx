import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { allowedDomainsColumn } from './columns/allowedDomainsColumn'
import { createActionsColumn } from './columns/createActionsColumn'
import { createUsernameColumn } from './columns/createUsernameColumn'
import { roleColumn } from './columns/roleColumn'
import type { GetUsersColumnsParams } from './GetUsersColumnsParams'

export function getUsersColumns(
  params: GetUsersColumnsParams,
): ColumnDef<User>[] {
  return [
    createUsernameColumn(params.currentUserId),
    roleColumn,
    allowedDomainsColumn,
    createActionsColumn(params),
  ]
}
