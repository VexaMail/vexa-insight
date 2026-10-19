import { Button, DialogFooter } from '@/components/ui'
import { Save } from 'lucide-react'
import type { EditorDialogFooterProps } from './EditorDialogFooterProps'

/** Cancel and Save at the bottom of an editor dialog. */
export function EditorDialogFooter({
  saving,
  onClose,
}: Readonly<EditorDialogFooterProps>) {
  return (
    <DialogFooter className="border-border gap-2 border-t px-5 py-3">
      <Button
        type="button"
        variant="outline"
        className="h-10"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button type="submit" className="h-10" disabled={saving}>
        <Save />
        {saving ? 'Saving…' : 'Save'}
      </Button>
    </DialogFooter>
  )
}
