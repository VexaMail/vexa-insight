import type { NavigatorPosition } from '@/types/ui'
import { useMemo } from 'react'

/** Where the current item sits in the scope, and whether neighbours exist. */
export function useNavigatorPosition(
  itemsScope: readonly string[],
  currentId: string,
): NavigatorPosition {
  return useMemo(() => {
    const currentIndex = itemsScope.indexOf(currentId)
    const total = itemsScope.length

    return {
      currentIndex,
      hasNext: currentIndex !== -1 && currentIndex < total - 1,
      hasPrev: currentIndex !== -1 && currentIndex > 0,
      total,
    }
  }, [itemsScope, currentId])
}
