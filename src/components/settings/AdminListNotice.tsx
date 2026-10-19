import { AlertTriangle, Info } from 'lucide-react'
import type { AdminListNoticeProps } from './AdminListNoticeProps'

/** One line above a list: a load error first, else the last action's outcome. */
export function AdminListNotice({
  notice,
  error,
}: Readonly<AdminListNoticeProps>) {
  const message = error ?? notice
  if (message === null) return null
  return (
    <p
      role="status"
      className={`mb-3 flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${error === null ? 'border-info/30 bg-info/10 text-info' : 'border-danger/30 bg-danger/10 text-danger'}`}
    >
      {error === null ? (
        <Info className="mt-px h-3.5 w-3.5 shrink-0" />
      ) : (
        <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" />
      )}
      <span>{message}</span>
    </p>
  )
}
