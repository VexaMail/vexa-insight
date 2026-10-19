import type { ChangeEvent, DragEvent, SyntheticEvent } from 'react'
import type { RecentUpload } from './RecentUpload'
import type { UploadStatus } from './UploadStatus'

export type UseUploadFormReturn = {
  readonly status: UploadStatus
  readonly message: string
  readonly dragActive: boolean
  readonly selectedName: string | null
  readonly recentUploads: RecentUpload[]
  readonly handleSubmit: (e: SyntheticEvent) => Promise<void>
  readonly handleDrag: (e: DragEvent) => void
  readonly handleDrop: (e: DragEvent) => void
  readonly handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}
