'use client'

import { navGroups } from '@/constants/shell'
import type { UseCommandPaletteReturn } from '@/types/shell'
import { fetchDomainNames } from '@/utils/fetch'
import { resolveCommandTargets } from '@/utils/shell'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCommandPaletteHotkey } from './useCommandPaletteHotkey'

/**
 * State of the global jump box: open flag (also Cmd+K / Ctrl+K), the query,
 * the pages it resolves to and the monitored domains it suggests, fetched the
 * first time it opens.
 */
export function useCommandPalette(): UseCommandPaletteReturn {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [domains, setDomains] = useState<readonly string[] | null>(null)
  const router = useRouter()
  useCommandPaletteHotkey(setOpen)

  useEffect(() => {
    if (!open || domains !== null) return
    void (async () => {
      setDomains(await fetchDomainNames())
    })()
  }, [open, domains])

  const needle = query.trim().toLowerCase()
  return {
    open,
    setOpen,
    query,
    setQuery,
    targets: resolveCommandTargets(query, domains ?? []),
    pages: navGroups
      .flatMap((group) => group.items)
      .filter((item) => item.title.toLowerCase().includes(needle)),
    go: (href: string) => {
      setOpen(false)
      setQuery('')
      router.push(href)
    },
  }
}
