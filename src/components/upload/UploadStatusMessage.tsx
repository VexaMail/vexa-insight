import { AlertCircle, CheckCircle } from 'lucide-react'

/** Result banner of the last upload attempt. */
export function UploadStatusMessage({
  status,
  message,
}: Readonly<{ status: string; message: string }>) {
  const isError = status === 'error'

  return (
    <div
      role="status"
      className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
        isError ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
      }`}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      {message}
    </div>
  )
}
