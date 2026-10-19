import { Button, Input } from '@/components/ui'
import { SETTINGS_INPUT_CLASS_NAME } from '@/constants/settings'
import type { FolderPickerCreateFormProps } from './FolderPickerCreateFormProps'

export function FolderPickerCreateForm({
  newFolderPath,
  creating,
  createError,
  onPathChange,
  onCreate,
  onCancel,
}: FolderPickerCreateFormProps) {
  return (
    <div className="min-w-0">
      <Input
        aria-label="New folder path"
        type="text"
        value={newFolderPath}
        onChange={(e) => {
          onPathChange(e.target.value)
        }}
        placeholder="e.g. Processed or INBOX/Processed"
        className={SETTINGS_INPUT_CLASS_NAME}
      />
      {createError != null && createError !== '' && (
        <p className="text-danger text-xs">{createError}</p>
      )}
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          className="h-7 text-xs"
          onClick={() => void onCreate()}
          disabled={creating || !newFolderPath.trim()}
        >
          {creating ? 'Creating…' : 'Create'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
