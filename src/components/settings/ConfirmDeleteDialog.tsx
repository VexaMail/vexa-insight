import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { Trash2 } from 'lucide-react'
import type { ConfirmDeleteDialogProps } from './ConfirmDeleteDialogProps'

/** Asks once before a delete that cannot be undone. */
export function ConfirmDeleteDialog({
  target,
  noun,
  consequence,
  onCancel,
  onConfirm,
}: Readonly<ConfirmDeleteDialogProps>) {
  return (
    <Dialog
      open={target !== null}
      onOpenChange={(open) => {
        if (!open) onCancel()
      }}
    >
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {noun}?</DialogTitle>
          <DialogDescription>
            <span className="text-foreground font-mono">{target?.name}</span> is
            removed for good. {consequence}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" className="h-10" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" className="h-10" onClick={onConfirm}>
            <Trash2 />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
