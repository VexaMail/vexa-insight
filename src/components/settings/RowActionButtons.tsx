import { Button } from '@/components/ui'
import { Pencil, Trash2 } from 'lucide-react'
import type { RowActionButtonsProps } from './RowActionButtonsProps'

/** Edit and delete controls at the end of a settings list row. */
export function RowActionButtons({
  name,
  busy,
  onEdit,
  onDelete,
  children,
}: Readonly<RowActionButtonsProps>) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {children}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        disabled={busy}
        onClick={onEdit}
        aria-label={`Edit ${name}`}
      >
        <Pencil />
        <span className="hidden sm:inline">Edit</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-danger hover:bg-danger/10 hover:text-danger h-9 w-9"
        disabled={busy}
        onClick={onDelete}
        aria-label={`Delete ${name}`}
      >
        <Trash2 />
      </Button>
    </div>
  )
}
