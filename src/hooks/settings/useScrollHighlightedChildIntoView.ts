'use client'

import type { RefObject } from 'react'
import { useEffect } from 'react'

/** Keeps the highlighted child of a list container visible. */
export function useScrollHighlightedChildIntoView(
  listRef: RefObject<HTMLDivElement | null>,
  highlightIndex: number,
): void {
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return
    const el = listRef.current.children[highlightIndex] as
      HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [listRef, highlightIndex])
}
