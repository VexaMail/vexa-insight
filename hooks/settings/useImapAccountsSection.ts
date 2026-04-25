'use client'

import { useState } from 'react'

import type {
  ImapAccountFormEntry,
  UseImapAccountsSectionReturn,
} from '@/types/settings'

export function useImapAccountsSection(
  accounts: readonly ImapAccountFormEntry[],
  onAdd: () => void,
): UseImapAccountsSectionReturn {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(() => {
    const initial = new Set<number>()
    accounts.forEach((acc, i) => {
      if (acc.id === 0) initial.add(i)
    })
    return initial
  })

  function toggleExpand(index: number) {
    setExpandedIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function handleAdd() {
    onAdd()
    setExpandedIndices((prev) => new Set([...prev, accounts.length]))
  }

  return { expandedIndices, toggleExpand, handleAdd }
}
