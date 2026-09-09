import type {
  RecentUpload,
  UploadStatus,
  UseUploadFormReturn,
} from '@/types/upload'
import { newRecentUpload, uploadReportFile } from '@/utils/upload'
import { useState } from 'react'
import { useUploadDrag } from './useUploadDrag'

export function useUploadForm(): UseUploadFormReturn {
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [message, setMessage] = useState('')
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([])

  async function handleFile(file: File) {
    setStatus('loading')
    setMessage('')
    const result = await uploadReportFile(file)
    setMessage(result.message)
    setStatus(result.status)
    setRecentUploads((prev) => [
      newRecentUpload(file.name, result),
      ...prev.slice(0, 4),
    ])
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const input = form.querySelector<HTMLInputElement>('input[type="file"]')
    const file = input?.files?.[0]
    if (!file) {
      setMessage('Please select a file.')
      setStatus('error')
      return
    }
    await handleFile(file)
    form.reset()
  }

  const { dragActive, handleDrag, handleDrop } = useUploadDrag((file) => {
    void handleFile(file)
  })

  return {
    status,
    message,
    dragActive,
    recentUploads,
    handleSubmit,
    handleDrag,
    handleDrop,
  }
}
