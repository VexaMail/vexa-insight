'use client'

import { IngestStoreContext } from '@/contexts/ingest'

import { useIngestStoreProvider } from '@/hooks/ingest'
import type { IngestStoreProviderProps } from '../../types/IngestStoreProviderProps'

export function IngestStoreProvider({
  children,
  initialState,
}: IngestStoreProviderProps) {
  const store = useIngestStoreProvider(initialState)

  return (
    <IngestStoreContext.Provider value={store}>
      {children}
    </IngestStoreContext.Provider>
  )
}
