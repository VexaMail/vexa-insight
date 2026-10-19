import type { ChangeEvent, DragEvent } from 'react'

export type UploadDropZoneProps = {
  readonly dragActive: boolean
  /** Name of the file picked but not uploaded yet. */
  readonly selectedName: string | null
  readonly onDrag: (e: DragEvent) => void
  readonly onDrop: (e: DragEvent) => void
  readonly onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}
