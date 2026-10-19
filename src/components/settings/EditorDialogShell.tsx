import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { AdminListNotice } from './AdminListNotice'
import { EditorDialogFooter } from './EditorDialogFooter'
import type { EditorDialogShellProps } from './EditorDialogShellProps'

/** Create/edit dialog frame: header, scrolling fields, error, Cancel and Save. */
export function EditorDialogShell({
  open,
  title,
  description,
  error,
  saving,
  onClose,
  onSubmit,
  children,
}: Readonly<EditorDialogShellProps>) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent className="bg-card border-border flex max-h-[92dvh] max-w-xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="border-border border-b px-5 py-4 pr-12 text-left">
          <DialogTitle className="text-base">{title}</DialogTitle>
          <DialogDescription className="text-xs">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onSubmit()
          }}
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <AdminListNotice notice={null} error={error} />
            {children}
          </div>
          <EditorDialogFooter saving={saving} onClose={onClose} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
