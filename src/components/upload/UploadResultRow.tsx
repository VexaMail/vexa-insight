import { StatusPill } from '@/components/ui'
import type { UploadResultRowProps } from '@/types/upload'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

/** One finished upload: outcome, file, what the server said, and a link. */
export function UploadResultRow({ upload }: Readonly<UploadResultRowProps>) {
  const accepted = upload.status === 'success'
  return (
    <li className="flex flex-col gap-1.5 px-4 py-3 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-foreground min-w-0 truncate font-mono text-xs font-medium">
          {upload.name}
        </span>
        <StatusPill
          tone={accepted ? 'success' : 'danger'}
          icon={accepted ? <Check /> : <X />}
        >
          {accepted ? 'Parsed' : 'Rejected'}
        </StatusPill>
      </div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground min-w-0 break-words">
          {upload.message}
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-muted-foreground font-mono tabular-nums">
            {upload.time}
          </span>
          {upload.reportId !== null ? (
            <Link
              href={`/reports/${String(upload.reportId)}`}
              className="text-primary font-medium hover:underline"
            >
              Open report
            </Link>
          ) : null}
        </span>
      </div>
    </li>
  )
}
