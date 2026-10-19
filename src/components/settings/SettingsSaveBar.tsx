import { Button } from '@/components/ui'
import type { SettingsSaveBarProps } from '@/types/settings'
import { Save } from 'lucide-react'
import { SettingsSaveBarStatus } from './SettingsSaveBarStatus'

/**
 * Sticky submit bar of the settings form: unsaved edits, the outcome of the
 * last save, and the one Save action. GeoIP, AI provider and SNDS keep their
 * own save buttons.
 */
export function SettingsSaveBar({
  saveStatus,
  message,
  canSave,
  isDirty,
}: Readonly<SettingsSaveBarProps>) {
  return (
    <div
      className={`glass-card sticky bottom-0 z-10 flex flex-col gap-3 px-4 py-3 shadow-lg transition-colors sm:flex-row sm:items-center sm:justify-between ${isDirty ? 'border-warning/50' : ''}`}
    >
      <SettingsSaveBarStatus
        saveStatus={saveStatus}
        message={message}
        isDirty={isDirty}
      />
      <Button
        type="submit"
        variant={isDirty ? 'default' : 'outline'}
        className="h-10 w-full shrink-0 sm:w-auto"
        disabled={saveStatus === 'loading' || !canSave}
      >
        <Save />
        {saveStatus === 'loading' ? 'Saving…' : 'Save configuration'}
      </Button>
    </div>
  )
}
