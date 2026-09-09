import type { UseUploadDragReturn } from '@/types/upload'
import { useState } from 'react'

/** Drag-over highlight and the drop that hands the first file over. */
export function useUploadDrag(
  onFile: (file: File) => void,
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
    const file = e.dataTransfer.files[0]
    if (file) {
      onFile(file)
    }
  }

  return { dragActive, handleDrag, handleDrop }
}
