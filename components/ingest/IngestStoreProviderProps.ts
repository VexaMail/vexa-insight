import { type ReactNode } from 'react'
import type { IngestState } from './IngestState'

export type IngestStoreProviderProps = {
  readonly children: ReactNode
  readonly initialState?: Partial<IngestState>
}
