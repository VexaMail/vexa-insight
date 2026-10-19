import type {
  RecentUpload,
  UploadStatus,
  UseUploadFormReturn,
} from '@/types/upload'
import { newRecentUpload, uploadReportFile } from '@/utils/upload'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useUploadDrag } from './useUploadDrag'

export function useUploadForm(): UseUploadFormReturn {
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [message, setMessage] = useState('')
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([])

  async function handleFile(file: File) {
    setStatus('loading')
    setMessage('')
    setSelectedName(file.name)
    const result = await uploadReportFile(file)
    setMessage(result.message)
    setStatus(result.status)
    setSelectedName(null)
    setRecentUploads((prev) => [
      newRecentUpload(file.name, result),
      ...prev.slice(0, 9),
    ])
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const input = form.querySelector<HTMLInputElement>('input[type="file"]')
    const file = input?.files?.[0]
    if (!file) {
      setMessage('Choose a file first.')
      setStatus('error')
      return
    }
    await handleFile(file)
    form.reset()
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedName(e.target.files?.[0]?.name ?? null)
  }

  const { dragActive, handleDrag, handleDrop } = useUploadDrag((file) => {
    void handleFile(file)
  })

  return {
    status,
    message,
    dragActive,
    selectedName,
    recentUploads,
    handleSubmit,
    handleDrag,
    handleDrop,
    handleFileChange,
  }
}
