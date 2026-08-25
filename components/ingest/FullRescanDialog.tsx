'use client'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import type { FullRescanDialogProps } from '@/types/ingest'
import { History } from 'lucide-react'
import { useFullRescanDialog } from '../../hooks/ingest/useFullRescanDialog'

export default function FullRescanDialog({
  disabled = false,
  onConfirm,
}: Readonly<FullRescanDialogProps>) {
  const { open, setOpen, confirm, close } = useFullRescanDialog(onConfirm)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-8 gap-1.5 px-3 text-xs"
        >
          <History className="h-3 w-3" />
          Full rescan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rescan the whole mailbox?</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 text-left">
              <p>
                Scheduled runs only look at the configured ingestion window. A
                full rescan ignores that window and walks every message in the
                selected folders, from the oldest one onwards.
              </p>
              <p>
                On a large mailbox this takes a long time and keeps the IMAP
                connection busy; no scheduled run can start while it lasts.
                Messages already ingested are skipped by Message-ID, so nothing
                is duplicated.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={close}>
            Cancel
          </Button>
          <Button type="button" size="sm" onClick={confirm}>
            Start full rescan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
