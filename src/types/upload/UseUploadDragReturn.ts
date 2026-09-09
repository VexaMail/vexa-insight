import type { DragEvent } from 'react'

export type UseUploadDragReturn = {
  readonly dragActive: boolean
  readonly handleDrag: (e: DragEvent) => void
  readonly handleDrop: (e: DragEvent) => void
}
