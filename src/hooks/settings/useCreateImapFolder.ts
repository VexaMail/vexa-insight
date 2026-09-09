'use client'

import type { UseCreateImapFolderReturn } from '@/types/settings'
import { createImapFolder } from '@/utils/settings'
import { useState } from 'react'

/** The inline "new folder" form: its path, visibility, request and error. */
export function useCreateImapFolder(
  accountId: number,
  apiKey: string,
  onCreated: (path: string) => Promise<void>,
): UseCreateImapFolderReturn {
  const [newFolderPath, setNewFolderPath] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  async function handleCreate() {
    const trimmed = newFolderPath.trim()
    if (!trimmed) return

    setCreating(true)
    setCreateError(null)
    try {
      await createImapFolder(accountId, trimmed, apiKey)
      setNewFolderPath('')
      setShowCreate(false)
      await onCreated(trimmed)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : String(err))
    } finally {
      setCreating(false)
    }
  }

  function handleNewFolderPathChange(value: string) {
    setNewFolderPath(value)
  }

  function handleToggleShowCreate() {
    setShowCreate((v) => !v)
  }

  function handleCancelCreate() {
    setShowCreate(false)
    setNewFolderPath('')
    setCreateError(null)
  }

  return {
    newFolderPath,
    showCreate,
    creating,
    createError,
    handleCreate,
    handleNewFolderPathChange,
    handleToggleShowCreate,
    handleCancelCreate,
  }
}
