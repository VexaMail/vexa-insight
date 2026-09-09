import { useRouter } from 'next/navigation'
import { startTransition, useCallback } from 'react'

/** Replaces the current URL's query under a transition, keeping scroll. */
export function useReplaceQuery(
  basePath: string,
): (params: URLSearchParams) => void {
  const router = useRouter()
  return useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        router.replace(`${basePath}?${params.toString()}`, { scroll: false })
      })
    },
    [router, basePath],
  )
}
