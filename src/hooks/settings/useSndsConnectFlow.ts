'use client'

import type {
  SndsSyncResponse,
  UseSndsConnectFlowReturn,
  UseSndsRunnerReturn,
} from '@/types/settings'
import type { SndsConnectionPublic } from '@/types/snds'
import { applySndsSyncResult, callSndsAdminApi } from '@/utils/settings'
import { toSndsRedirectQuery } from '@/utils/snds'
import { useState } from 'react'

/**
 * Connecting SNDS: open the Microsoft sign-in, then submit the
 * `http://localhost/?code=...` address the browser ended on.
 */
export function useSndsConnectFlow(
  apiKey: string,
  runner: UseSndsRunnerReturn,
  setConnection: (value: SndsConnectionPublic) => void,
): UseSndsConnectFlowReturn {
  const [authorizeUrl, setAuthorizeUrl] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState('')
  const { run, setMessage } = runner

  return {
    authorizeUrl,
    redirectUrl,
    setRedirectUrl,
    handleConnect: () => {
      run(async () => {
        const result = await callSndsAdminApi<{ authorizeUrl: string }>(
          apiKey,
          '/authorize',
          'POST',
        )
        if (!result.ok) {
          setMessage(result.message)
          return
        }
        setAuthorizeUrl(result.data.authorizeUrl)
        window.open(result.data.authorizeUrl, '_blank', 'noopener')
      })
    },
    handleSubmitRedirect: () => {
      run(async () => {
        const result = await callSndsAdminApi<SndsSyncResponse>(
          apiKey,
          '/callback',
          'POST',
          { redirectUrl: toSndsRedirectQuery(redirectUrl) },
        )
        if (!applySndsSyncResult(result, setConnection, setMessage)) return
        setAuthorizeUrl(null)
        setRedirectUrl('')
      })
    },
  }
}
