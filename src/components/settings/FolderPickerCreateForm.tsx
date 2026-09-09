import { Button, Input } from '@/components/ui'
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
    <div className="space-y-1.5">
      <Input
        aria-label="New folder path"
        type="text"
        value={newFolderPath}
        onChange={(e) => {
          onPathChange(e.target.value)
        }}
        placeholder="e.g. Processed or INBOX/Processed"
        className="bg-card border-border/50 text-xs"
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
