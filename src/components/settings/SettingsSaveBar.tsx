import { Button } from '@/components/ui'
import { Save } from 'lucide-react'

/**
 * Sticky submit bar of the settings form and the outcome of the last save.
 * GeoIP, AI provider and SNDS keep their own save buttons.
 */
export function SettingsSaveBar({
  saveStatus,
  message,
  canSave,
}: Readonly<{ saveStatus: string; message: string; canSave: boolean }>) {
  return (
    <div className="glass-card sticky bottom-0 z-10 flex flex-col gap-3 px-4 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 text-xs">
        {message === '' ? (
          <p className="text-muted-foreground">
            Saves General, Mailboxes, Ingestion, IP hostname lookup and
            Advanced.
          </p>
        ) : (
          <p
            role="status"
            className={`text-sm font-medium ${saveStatus === 'error' ? 'text-danger' : 'text-success'}`}
          >
            {message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="h-10 w-full shrink-0 sm:w-auto"
        disabled={saveStatus === 'loading' || !canSave}
      >
        <Save />
        {saveStatus === 'loading' ? 'Saving…' : 'Save configuration'}
      </Button>
    </div>
  )
}
