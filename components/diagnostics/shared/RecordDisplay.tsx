import { CopyButton } from './CopyButton'
import type { RecordDisplayProps } from './RecordDisplayProps'

export function RecordDisplay({ label, record }: Readonly<RecordDisplayProps>) {
  if (!record) {
    return (
      <div className="rounded-lg border border-dashed p-3">
        <span className="text-muted-foreground text-sm italic">
          No {label} record found
        </span>
      </div>
    )
  }

  return (
    <div className="bg-muted/50 rounded-lg border p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {label} Record
        </span>
        <CopyButton text={record} />
      </div>
      <code className="text-foreground block text-sm leading-relaxed break-all">
        {record}
      </code>
    </div>
  )
}
