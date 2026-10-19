import type { ChangeEvent, DragEvent } from 'react'

export type UploadDropZoneProps = {
  readonly dragActive: boolean
  readonly onDrag: (e: DragEvent) => void
  readonly onDrop: (e: DragEvent) => void
  readonly onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}
