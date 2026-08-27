'use client'

import type { ProviderModelInfo } from '@/types/ai'
import { useMemo, useState } from 'react'

/**
 * Filters a list of provider models by a search query.
 * Matches against model ID and name (case-insensitive).
 */
export function useModelFilter(models: ProviderModelInfo[]) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return models
    return models.filter(
      (m) => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q),
    )
  }, [models, query])

  return { query, setQuery, filtered }
}
