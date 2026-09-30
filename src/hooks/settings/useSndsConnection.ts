'use client'

import type { UseSndsConnectionReturn } from '@/types/settings'
import type { SndsConnectionPublic } from '@/types/snds'
import { callSndsAdminApi } from '@/utils/settings'
import { useEffect, useState } from 'react'

/** The SNDS connection state, loaded once the admin key is known. */
export function useSndsConnection(apiKey: string): UseSndsConnectionReturn {
  const [connection, setConnection] = useState<SndsConnectionPublic | null>(
    null,
  )

  useEffect(() => {
    if (!apiKey) return
    void (async () => {
      const result = await callSndsAdminApi<SndsConnectionPublic>(
        apiKey,
        '',
        'GET',
      )
      if (result.ok) setConnection(result.data)
    })()
  }, [apiKey])

  return { connection, setConnection }
}
