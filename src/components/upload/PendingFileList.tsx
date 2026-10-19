import type { PendingFileListProps } from '@/types/upload'
import { FileText, X } from 'lucide-react'

/** The files chosen or dropped, waiting for the one Upload action. */
export function PendingFileList({
  files,
  isUploading,
  onRemove,
}: Readonly<PendingFileListProps>) {
  if (files.length === 0) return null
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
        Ready to upload ({String(files.length)})
      </p>
      <ul className="border-border divide-border divide-y rounded-lg border">
        {files.map((file, index) => (
          <li
            key={`${file.name}-${String(file.size)}`}
            className="flex min-h-11 items-center gap-2 py-1 pr-1 pl-3"
          >
            <FileText
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span className="text-foreground min-w-0 flex-1 truncate font-mono text-xs">
              {file.name}
            </span>
            <button
              type="button"
              disabled={isUploading}
              onClick={() => {
                onRemove(index)
              }}
              aria-label={`Remove ${file.name}`}
              className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
