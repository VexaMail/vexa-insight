'use client'

import type { FolderState, UseFolderPickerReturn } from '@/types/settings'
import { fetchFolders } from '@/utils/settings'
import { useCallback, useState } from 'react'
import { useCreateImapFolder } from './useCreateImapFolder'

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

  const create = useCreateImapFolder(accountId, apiKey, async (path) => {
    await handleLoadFolders()
    onChange(path)
  })

  const hasLoaded = state.folders.length > 0 || state.error !== null

  return { state, hasLoaded, handleLoadFolders, ...create }
}
