'use client'

import { pollProgressPageSizeStorage } from '@/utils/ingest'
import { useState } from 'react'

import type { IngestState } from '@/types/IngestState'
import { createIngestStore } from './createIngestStore'

export function useIngestStoreProvider(
  initialState: Partial<IngestState> | undefined,
): ReturnType<typeof createIngestStore> {
  const [store] = useState(() =>
    createIngestStore({
      ...initialState,
      pageSize: initialState?.pageSize ?? pollProgressPageSizeStorage.get(),
    }),
  )

  return store
}
