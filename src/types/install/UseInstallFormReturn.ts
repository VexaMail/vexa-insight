import type { Dispatch, SyntheticEvent } from 'react'

import type { InstallAction } from './InstallAction'
import type { InstallFormProps } from './InstallFormProps'
import type { InstallState } from './InstallState'

export type UseInstallFormReturn = {
  readonly dispatch: Dispatch<InstallAction>
  readonly handleSubmit: (e: SyntheticEvent) => Promise<void>
  readonly isPartial: InstallFormProps['isPartial']
  readonly state: InstallState
}
