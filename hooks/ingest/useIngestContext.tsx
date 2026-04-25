import { IngestStoreContext } from '@/contexts/ingest'
import { useContext } from 'react'
import { useStore } from 'zustand'

import type { IngestStore } from '../../types/IngestStore'

export function useIngestContext<T>(selector: (state: IngestStore) => T): T {
  const store = useContext(IngestStoreContext)
  if (!store) {
    throw new Error('useIngestContext must be used within IngestStoreProvider')
  }
  return useStore(store, selector)
}
