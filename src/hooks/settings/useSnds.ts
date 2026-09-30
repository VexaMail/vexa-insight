'use client'

import type { SndsSyncResponse, UseSndsReturn } from '@/types/settings'
import type { SndsConnectionPublic } from '@/types/snds'
import { applySndsSyncResult, callSndsAdminApi } from '@/utils/settings'
import { useSndsConnectFlow } from './useSndsConnectFlow'
import { useSndsConnection } from './useSndsConnection'
import { useSndsRunner } from './useSndsRunner'

/** State and actions of the Microsoft SNDS settings card. */
export function useSnds(apiKey: string): UseSndsReturn {
  const { connection, setConnection } = useSndsConnection(apiKey)
  const runner = useSndsRunner()
  const connectFlow = useSndsConnectFlow(apiKey, runner, setConnection)
  const { run, setMessage } = runner

  return {
    ...connectFlow,
    connection,
    isBusy: runner.isBusy,
    message: runner.message,
    handleSync: () => {
      run(async () => {
        const result = await callSndsAdminApi<SndsSyncResponse>(
          apiKey,
          '/sync',
          'POST',
        )
        applySndsSyncResult(result, setConnection, setMessage)
      })
    },
    handleDisconnect: () => {
      run(async () => {
        const result = await callSndsAdminApi<SndsConnectionPublic>(
          apiKey,
          '',
          'DELETE',
        )
        if (!result.ok) {
          setMessage(result.message)
          return
        }
        setConnection(result.data)
        setMessage('Disconnected. Stored SNDS data was kept.')
      })
    },
  }
}
