import type { DragEvent, SyntheticEvent } from 'react'
import type { RecentUpload } from './RecentUpload'
import type { UploadStatus } from './UploadStatus'

export type UseUploadFormReturn = {
  readonly status: UploadStatus
  readonly message: string
  readonly dragActive: boolean
  readonly recentUploads: RecentUpload[]
  readonly handleSubmit: (e: SyntheticEvent) => Promise<void>
  readonly handleDrag: (e: DragEvent) => void
  readonly handleDrop: (e: DragEvent) => void
}
