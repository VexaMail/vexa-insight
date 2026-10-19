import type { UsePendingUploadsReturn } from '@/types/upload'
import { mergePendingFiles } from '@/utils/upload'
import { useState } from 'react'

/** The files chosen or dropped and waiting for the one Upload action. */
export function usePendingUploads(): UsePendingUploadsReturn {
  const [pendingFiles, setPendingFiles] = useState<File[]>([])

  function addFiles(files: File[]) {
    setPendingFiles((prev) => mergePendingFiles(prev, files))
  }

  function removeFile(index: number) {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function clearFiles() {
    setPendingFiles([])
  }

  return { pendingFiles, addFiles, removeFile, clearFiles }
}
