import { useListState } from '@/hooks/core'
import type { UseScopeModeHandlersReturn } from '@/types/ui'
import { fetchAllItemIds } from '@/utils/ui'

/** Switches the navigator scope; "all" also loads every id from the API. */
export function useScopeModeHandlers(
  basePath: string | undefined,
): UseScopeModeHandlersReturn {
  const setScopeMode = useListState((s) => s.setScopeMode)
  const setScope = useListState((s) => s.setScope)

  const handleSetScopeFiltered = () => {
    setScopeMode('filtered')
  }

  const handleSetScopeAll = () => {
    setScopeMode('all')
    if (!basePath) return

    void (async () => {
      try {
        const ids = await fetchAllItemIds(basePath)
        if (ids !== null) setScope(ids)
      } catch (e) {
        console.error('Failed to load all items scope', e)
      }
    })()
  }

  return { handleSetScopeAll, handleSetScopeFiltered }
}
