import type { IngestStore } from '@/types/IngestStore'
import { createContext } from 'react'
import type { StoreApi } from 'zustand'

export const IngestStoreContext = createContext<StoreApi<IngestStore> | null>(
  null,
)
