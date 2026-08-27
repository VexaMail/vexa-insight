'use client'

import type { FolderState, UseFolderPickerReturn } from '@/types/settings'
import { createImapFolder, fetchFolders } from '@/utils/settings'
import { useCallback, useState } from 'react'

export function useFolderPicker(
  accountId: number,
  apiKey: string,
  onChange: (path: string | null) => void,
): UseFolderPickerReturn {
  const [state, setState] = useState<FolderState>({
    folders: [],
    loading: false,
    error: null,
  })
  const [newFolderPath, setNewFolderPath] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const handleLoadFolders = useCallback(async () => {
    if (!accountId) return
    setState({ folders: [], loading: true, error: null })
    try {
      const folders = await fetchFolders(accountId, apiKey)
      setState({ folders, loading: false, error: null })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setState({ folders: [], loading: false, error: msg })
    }
  }, [accountId, apiKey])

  async function handleCreate() {
    const trimmed = newFolderPath.trim()
    if (!trimmed) return

    setCreating(true)
    setCreateError(null)
    try {
      await createImapFolder(accountId, trimmed, apiKey)
      setNewFolderPath('')
      setShowCreate(false)
      await handleLoadFolders()
      onChange(trimmed)
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

  const hasLoaded = state.folders.length > 0 || state.error !== null

  return {
    state,
    newFolderPath,
    showCreate,
    creating,
    createError,
    hasLoaded,
    handleLoadFolders,
    handleCreate,
    handleNewFolderPathChange,
    handleToggleShowCreate,
    handleCancelCreate,
  }
}
