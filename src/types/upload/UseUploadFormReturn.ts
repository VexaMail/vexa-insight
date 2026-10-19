import type { ChangeEvent, DragEvent, SyntheticEvent } from 'react'
import type { RecentUpload } from './RecentUpload'
import type { UploadStatus } from './UploadStatus'

export type UseUploadFormReturn = {
  readonly status: UploadStatus
  readonly message: string
  readonly dragActive: boolean
  /** Files chosen or dropped, waiting for Upload. */
  readonly pendingFiles: readonly File[]
  readonly recentUploads: RecentUpload[]
  readonly handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>
  readonly handleDrag: (e: DragEvent) => void
  readonly handleDrop: (e: DragEvent) => void
  readonly handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  readonly handleRemovePending: (index: number) => void
}
