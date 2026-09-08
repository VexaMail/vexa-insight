'use client'

import { useEffect, useState } from 'react'

/**
 * Loads a string list from an options endpoint, aborting the in-flight request
 * when the query changes or the component unmounts.
 */
export function useFetchedOptions(
  path: string,
  query: string,
  enabled: boolean,
): string[] {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    if (!enabled) return
    const ctrl = new AbortController()
    const run = async () => {
      try {
        const res = await fetch(query ? `${path}?${query}` : path, {
          signal: ctrl.signal,
        })
        const json = (await res.json()) as { data: string[] }
        setOptions(json.data)
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
      }
    }
    void run()

    return () => {
      ctrl.abort()
    }
  }, [path, query, enabled])

  return options
}
