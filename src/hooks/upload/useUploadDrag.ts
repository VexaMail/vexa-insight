import type { UseUploadDragReturn } from '@/types/upload'
import { useState } from 'react'

/** Drag-over highlight and the drop that hands every dropped file over. */
export function useUploadDrag(
  onFiles: (files: File[]) => void,
): UseUploadDragReturn {
  const [dragActive, setDragActive] = useState(false)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) onFiles(files)
  }

  return { dragActive, handleDrag, handleDrop }
}
