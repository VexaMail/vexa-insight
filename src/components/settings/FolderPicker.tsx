import { Button, Input } from '@/components/ui'
import { useFolderPicker } from '@/hooks/settings'
import { FolderPlus, RefreshCw } from 'lucide-react'

export function FolderPicker({
  accountId,
  apiKey,
  value,
  onChange,
}: Readonly<{
  accountId: number
  apiKey: string
  value: string | null
  onChange: (path: string | null) => void
}>) {
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
        <select
          aria-label="Destination folder"
          value={value ?? ''}
          onChange={(e) => {
            onChange(e.target.value || null)
          }}
          className="bg-card border-border/50 text-foreground min-w-0 flex-1 rounded-md border px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
          onFocus={() => {
            if (!hasLoaded && !state.loading) {
              void handleLoadFolders()
            }
          }}
        >
          <option value="">-- Select folder --</option>
          {state.folders.map((f) => (
            <option key={f.path} value={f.path}>
              {f.path}
            </option>
          ))}
        </select>
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
      {showCreate === true && (
        <div className="space-y-1.5">
          <Input
            aria-label="New folder path"
            type="text"
            value={newFolderPath}
            onChange={(e) => {
              handleNewFolderPathChange(e.target.value)
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
              onClick={() => void handleCreate()}
              disabled={creating || !newFolderPath.trim()}
            >
              {creating ? 'Creating…' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={handleCancelCreate}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
