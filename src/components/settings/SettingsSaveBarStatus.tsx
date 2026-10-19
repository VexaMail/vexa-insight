import { StatusPill } from '@/components/ui'
import type { SettingsSaveBarStatusProps } from '@/types/settings'

/** A failed save first, then unsaved edits, then the last success, then what the bar saves. */
export function SettingsSaveBarStatus({
  saveStatus,
  message,
  isDirty,
}: Readonly<SettingsSaveBarStatusProps>) {
  if (message !== '' && saveStatus === 'error') {
    return (
      <p role="status" className="text-danger min-w-0 text-sm font-medium">
        {message}
      </p>
    )
  }
  if (isDirty) {
    return (
      <div role="status" className="flex min-w-0 items-center gap-2 text-xs">
        <StatusPill tone="warning" dot>
          Unsaved changes
        </StatusPill>
        <span className="text-muted-foreground">
          Save to apply them; leaving the page discards them.
        </span>
      </div>
    )
  }
  if (message !== '') {
    return (
      <p role="status" className="text-success min-w-0 text-sm font-medium">
        {message}
      </p>
    )
  }
  return (
    <p className="text-muted-foreground min-w-0 text-xs">
      Saves General, Mailboxes, Ingestion, IP hostname lookup and Advanced.
    </p>
  )
}
