'use client'

import type { TriggerPollFormProps } from '@/types/ingest'
import { useTriggerPoll } from '../../hooks/ingest/useTriggerPoll'
import FullRescanDialog from './FullRescanDialog'
import { TriggerPollApiKeyField } from './TriggerPollApiKeyField'
import { TriggerPollMessage } from './TriggerPollMessage'
import { TriggerPollSubmitButton } from './TriggerPollSubmitButton'

export default function TriggerPollForm({
  className = '',
  hideApiKeyWhenPrefilled = false,
  initialApiKey = '',
}: Readonly<TriggerPollFormProps>) {
  const { apiKey, setApiKey, status, message, handleSubmit, handleFullRescan } =
    useTriggerPoll(initialApiKey)

  const showApiKeyInput = !(hideApiKeyWhenPrefilled && initialApiKey.trim())
  const isLoading = status === 'loading'
  const isDisabled = isLoading || !apiKey.trim()

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className={`flex flex-wrap items-end gap-4 ${className}`}
    >
      {showApiKeyInput ? (
        <TriggerPollApiKeyField value={apiKey} onChange={setApiKey} />
      ) : null}
      <TriggerPollSubmitButton isLoading={isLoading} disabled={isDisabled} />
      <FullRescanDialog
        disabled={isDisabled}
        onConfirm={() => {
          void handleFullRescan()
        }}
      />
      <TriggerPollMessage message={message} isError={status === 'error'} />
    </form>
  )
}
