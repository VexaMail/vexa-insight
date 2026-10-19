import type {
  RecentUpload,
  UploadReportResult,
  UploadStatus,
  UseUploadFormReturn,
} from '@/types/upload'
import {
  newRecentUpload,
  summarizeUploadBatch,
  uploadReportFile,
} from '@/utils/upload'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { usePendingUploads } from './usePendingUploads'
import { useUploadDrag } from './useUploadDrag'

/**
 * One model for both ways in: choosing or dropping files adds them to the
 * pending list, and the Upload action sends that list one file at a time.
 */
export function useUploadForm(): UseUploadFormReturn {
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [message, setMessage] = useState('')
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([])
  const { pendingFiles, addFiles, removeFile, clearFiles } = usePendingUploads()
  const { dragActive, handleDrag, handleDrop } = useUploadDrag(addFiles)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('loading')
    setMessage('')
    const results: UploadReportResult[] = []
    for (const file of pendingFiles) {
      const result = await uploadReportFile(file)
      results.push(result)
      setRecentUploads((prev) => [
        newRecentUpload(file.name, result),
        ...prev.slice(0, 9),
      ])
    }
    const summary = summarizeUploadBatch(results)
    setMessage(summary.message)
    setStatus(summary.status)
    clearFiles()
    form.reset()
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  return {
    status,
    message,
    dragActive,
    pendingFiles,
    recentUploads,
    handleSubmit,
    handleDrag,
    handleDrop,
    handleFileChange,
    handleRemovePending: removeFile,
  }
}
