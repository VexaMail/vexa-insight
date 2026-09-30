'use client'

import { Button } from '@/components/ui'
import { LogIn, RefreshCw, Unplug } from 'lucide-react'
import type { SndsActionsProps } from './SndsActionsProps'

/** Connect, sync and disconnect buttons of the SNDS settings card. */
export function SndsActions({
  connected,
  isBusy,
  onConnect,
  onSync,
  onDisconnect,
}: SndsActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={isBusy}
        onClick={onConnect}
      >
        <LogIn className="mr-2 h-4 w-4" />
        {connected ? 'Reconnect' : 'Connect'}
      </Button>
      {connected ? (
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isBusy}
            onClick={onSync}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isBusy ? 'Working...' : 'Sync now'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={isBusy}
            onClick={onDisconnect}
          >
            <Unplug className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </>
      ) : null}
    </div>
  )
}
