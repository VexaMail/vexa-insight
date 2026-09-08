import type { InstallAction } from '@/types/install'
import type React from 'react'

export type ImapAccountLabelRowProps = {
  readonly value: string
  readonly index: number
  readonly canRemove: boolean
  readonly dispatch: React.Dispatch<InstallAction>
}
