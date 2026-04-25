import type { Dispatch, SyntheticEvent } from 'react'

import type {
  InstallAction,
  InstallFormProps,
  InstallState,
} from '@/types/install'

export type UseInstallFormReturn = {
  readonly dispatch: Dispatch<InstallAction>
  readonly handleGenerateKey: () => void
  readonly handleSubmit: (e: SyntheticEvent) => Promise<void>
  readonly isPartial: InstallFormProps['isPartial']
  readonly state: InstallState
}
