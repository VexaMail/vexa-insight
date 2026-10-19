import { CopyButton } from '../shared'
import type { RecordPreviewProps } from './RecordPreviewProps'

/** The generated value, where to publish it, and a copy control. */
export function RecordPreview({
  kind,
  host,
  value,
}: Readonly<RecordPreviewProps>) {
  return (
    <div className="border-border bg-muted/40 space-y-2 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="flex min-w-0 flex-wrap items-center gap-2 text-xs">
          <span className="bg-secondary text-foreground rounded px-1.5 py-0.5 font-mono text-[11px] font-medium">
            {kind}
          </span>
          <span className="text-foreground font-mono break-all">{host}</span>
        </p>
        <CopyButton text={value} label="Copy" />
      </div>
      <pre className="text-foreground font-mono text-xs break-all whitespace-pre-wrap">
        {value}
      </pre>
    </div>
  )
}
