'use client'

import { Button } from '@/components/ui'
import { Trash2 } from 'lucide-react'
import type { AiSettingsActionsProps } from './AiSettingsActionsProps'
import { getAiSaveButtonLabel } from './getAiSaveButtonLabel'

export function AiSettingsActions({
  saveStatus,
  isSaving,
  isConfigured,
  canSave,
  onSave,
  onClear,
}: AiSettingsActionsProps) {
  return (
    <div className="flex gap-2">
      <Button type="button" disabled={isSaving || !canSave} onClick={onSave}>
        {getAiSaveButtonLabel(saveStatus)}
      </Button>

      {isConfigured ? (
        <Button
          type="button"
          variant="outline"
          disabled={isSaving}
          onClick={onClear}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      ) : null}
    </div>
  )
}
