'use client'

import { useListState } from '@/hooks/core'
import { useCallback } from 'react'

/** Scopes the detail navigator to the listed reports before one opens. */
export function useReportScopeHandler(scopeIds: string[]): () => void {
  const setScope = useListState((s) => s.setScope)
  return useCallback(() => {
    setScope(scopeIds)
  }, [setScope, scopeIds])
}
