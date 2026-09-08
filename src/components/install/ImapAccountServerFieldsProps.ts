import type { InstallAction } from '@/types/install'
import type React from 'react'

export type ImapAccountServerFieldsProps = {
  readonly server: string
  readonly port: number
  readonly index: number
  readonly dispatch: React.Dispatch<InstallAction>
}
