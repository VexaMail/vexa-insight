import { Button } from '@/components/ui'
import { useFolderPicker } from '@/hooks/settings'
import { FolderPlus, RefreshCw } from 'lucide-react'
import { FolderPickerCreateForm } from './FolderPickerCreateForm'
import type { FolderPickerProps } from './FolderPickerProps'
import { FolderPickerSelect } from './FolderPickerSelect'

export function FolderPicker({
  accountId,
  apiKey,
  value,
  onChange,
}: Readonly<FolderPickerProps>) {
  const {
    state,
    newFolderPath,
    showCreate,
    creating,
    createError,
    hasLoaded,
    handleLoadFolders,
    handleCreate,
    handleNewFolderPathChange,
    handleToggleShowCreate,
    handleCancelCreate,
  } = useFolderPicker(accountId, apiKey, onChange)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FolderPickerSelect
          value={value}
          state={state}
          hasLoaded={hasLoaded}
          onChange={onChange}
          onLoad={handleLoadFolders}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-7 w-7 shrink-0"
          onClick={() => void handleLoadFolders()}
          title="Refresh folders"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${state.loading ? 'animate-spin' : ''}`}
          />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-7 w-7 shrink-0"
          onClick={handleToggleShowCreate}
          title="Create new folder"
        >
          <FolderPlus className="h-3.5 w-3.5" />
        </Button>
      </div>
      {state.error != null && state.error !== '' && (
        <p className="text-danger text-xs">{state.error}</p>
      )}
      {showCreate ? (
        <FolderPickerCreateForm
          newFolderPath={newFolderPath}
          creating={creating}
          createError={createError}
          onPathChange={handleNewFolderPathChange}
          onCreate={handleCreate}
          onCancel={handleCancelCreate}
        />
      ) : null}
    </div>
  )
}
