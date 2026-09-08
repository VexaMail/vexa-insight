import type { AccountWithId, InstallAction } from '@/types/install'
import type React from 'react'

export type ImapAccountFieldsProps = {
  readonly account: AccountWithId
  readonly index: number
  readonly canRemove: boolean
  readonly dispatch: React.Dispatch<InstallAction>
}
