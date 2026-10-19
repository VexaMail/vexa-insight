import type { UploadStatusMessageProps } from '@/types/upload'
import { AlertCircle, CheckCircle } from 'lucide-react'

/** Result banner of the last upload attempt. */
export function UploadStatusMessage({
  status,
  message,
}: Readonly<UploadStatusMessageProps>) {
  const isError = status === 'error'

  return (
    <div
      role="status"
      className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
        isError
          ? 'border-danger/25 bg-danger/10 text-danger'
          : 'border-success/25 bg-success/10 text-success'
      }`}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      {message}
    </div>
  )
}
