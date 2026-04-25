import type { AccountWithId, InstallAction } from '@/types/install'
import type React from 'react'

export type ImapAccountsFieldsetProps = {
  imapAccounts: AccountWithId[]
  dispatch: React.Dispatch<InstallAction>
}
