import { Button } from '@/components/ui'
import { FolderPlus, RefreshCw } from 'lucide-react'
import type { FolderPickerToolbarProps } from './FolderPickerToolbarProps'

/** The refresh and new-folder icon buttons beside the folder select. */
export function FolderPickerToolbar({
  loading,
  onReload,
  onToggleCreate,
}: FolderPickerToolbarProps) {
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground h-7 w-7 shrink-0"
        onClick={() => void onReload()}
        title="Refresh folders"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground h-7 w-7 shrink-0"
        onClick={onToggleCreate}
        title="Create new folder"
      >
        <FolderPlus className="h-3.5 w-3.5" />
      </Button>
    </>
  )
}
