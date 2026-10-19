import type { PendingDelete } from './PendingDelete'

/** Delete confirmation, enable toggle and per-row feedback of a list. */
export type RowActionsState = {
  readonly pendingDelete: PendingDelete | null
  readonly askDelete: (target: PendingDelete) => void
  readonly cancelDelete: () => void
  readonly confirmDelete: () => Promise<void>
  readonly busyId: number | null
  readonly notice: string | null
  readonly setNotice: (notice: string | null) => void
  readonly toggleEnabled: (id: number, enabled: boolean) => Promise<void>
}
