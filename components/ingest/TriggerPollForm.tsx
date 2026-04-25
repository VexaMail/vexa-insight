'use client'

import { Button } from '@/components/ui'
import type { TriggerPollFormProps } from '@/types/ingest'
import { Play, RotateCw } from 'lucide-react'
import { useTriggerPoll } from '../../hooks/ingest/useTriggerPoll'

export default function TriggerPollForm({
  className = '',
  hideApiKeyWhenPrefilled = false,
  initialApiKey = '',
}: Readonly<TriggerPollFormProps>) {
  const { apiKey, setApiKey, status, message, handleSubmit } =
    useTriggerPoll(initialApiKey)

  const showApiKeyInput = !(hideApiKeyWhenPrefilled && initialApiKey.trim())

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className={`flex flex-wrap items-end gap-4 ${className}`}
    >
      {showApiKeyInput && (
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="trigger-poll-api-key"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            API key
          </label>
          <input
            id="trigger-poll-api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API key"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
            autoComplete="off"
          />
        </div>
      )}
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={status === 'loading' || !apiKey.trim()}
        className="h-8 gap-1.5 px-3 text-xs"
      >
        {status === 'loading' ? (
          <>
            <RotateCw className="h-3 w-3 animate-spin" />
            Running…
          </>
        ) : (
          <>
            <Play className="h-3 w-3" />
            Trigger poll
          </>
        )}
      </Button>
      {message && (
        <p
          role="status"
          className={`w-full text-sm ${
            status === 'error' ? 'text-destructive' : 'text-muted-foreground'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
