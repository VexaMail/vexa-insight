import type { RecentUpload } from '@/types/upload'
import { useState } from 'react'

export function useUploadForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([])

  function addRecentUpload(
    name: string,
    uploadStatus: 'success' | 'error',
    msg: string,
  ) {
    setRecentUploads((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        status: uploadStatus,
        message: msg,
        time: 'Just now',
      },
      ...prev.slice(0, 4),
    ])
  }

  async function handleFile(file: File) {
    setStatus('loading')
    setMessage('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/v1/reports/upload', {
        method: 'POST',
        body: formData,
      })
      const json = (await res.json()) as
        | {
            data?: {
              reportId?: number
              domain?: string
              processedRecords?: number
            }
          }
        | { error?: { message?: string } }
      if (!res.ok) {
        const err = json as { error?: { message?: string } }
        const msg = err.error?.message ?? `Error ${String(res.status)}`
        setMessage(msg)
        setStatus('error')
        addRecentUpload(file.name, 'error', msg)
        return
      }
      const data = json as {
        data?: { reportId?: number; domain?: string; processedRecords?: number }
      }
      const successMsg = `Report #${String(data.data?.reportId ?? '—')} — ${data.data?.domain ?? '—'} — ${String(data.data?.processedRecords ?? 0)} records`
      setMessage(successMsg)
      setStatus('success')
      addRecentUpload(file.name, 'success', successMsg)
    } catch {
      setMessage('Upload failed.')
      setStatus('error')
      addRecentUpload(file.name, 'error', 'Upload failed.')
    }
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

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      void handleFile(file)
    }
  }

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
