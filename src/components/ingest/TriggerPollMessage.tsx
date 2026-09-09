import type { TriggerPollMessageProps } from './TriggerPollMessageProps'

/** Result line under the trigger form; renders nothing while empty. */
export function TriggerPollMessage({
  message,
  isError,
}: Readonly<TriggerPollMessageProps>) {
  if (message === '') return null
  return (
    <p
      role="status"
      className={`w-full text-sm ${
        isError ? 'text-destructive' : 'text-muted-foreground'
      }`}
    >
      {message}
    </p>
  )
}
