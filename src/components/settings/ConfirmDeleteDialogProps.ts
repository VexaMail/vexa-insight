import type { PendingDelete } from '@/types/settings'

export type ConfirmDeleteDialogProps = {
  readonly target: PendingDelete | null
  /** What is being deleted, e.g. "webhook endpoint". */
  readonly noun: string
  /** What stops happening once it is gone. */
  readonly consequence: string
  readonly onCancel: () => void
  readonly onConfirm: () => void
}
