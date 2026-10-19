'use client'

import type { PendingDelete, RowActionsState } from '@/types/settings'
import { callAdminApi } from '@/utils/settings'
import { useState } from 'react'

/** Delete with confirmation and the enable toggle, for rows under `basePath`. */
export function useRowActions(
  basePath: string,
  reload: () => Promise<void>,
): RowActionsState {
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const run = async (
    id: number,
    method: 'PATCH' | 'DELETE',
    body?: unknown,
  ) => {
    setBusyId(id)
    const result = await callAdminApi(`${basePath}/${String(id)}`, method, body)
    setBusyId(null)
    setNotice(result.ok ? null : result.message)
    await reload()
    return result.ok
  }

  const confirmDelete = async () => {
    if (pendingDelete === null) return
    const { id, name } = pendingDelete
    setPendingDelete(null)
    if (await run(id, 'DELETE')) setNotice(`Deleted ${name}.`)
  }

  return {
    pendingDelete,
    askDelete: setPendingDelete,
    cancelDelete: () => {
      setPendingDelete(null)
    },
    confirmDelete,
    busyId,
    notice,
    setNotice,
    toggleEnabled: async (id, enabled) => {
      await run(id, 'PATCH', { enabled })
    },
  }
}
