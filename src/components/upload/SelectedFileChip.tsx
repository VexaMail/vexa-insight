import type { SelectedFileChipProps } from '@/types/upload'
import { FileText } from 'lucide-react'

/** The file picked in the drop zone, waiting for Upload. */
export function SelectedFileChip({ name }: Readonly<SelectedFileChipProps>) {
  if (!name) return null
  return (
    <span className="border-border bg-card text-foreground inline-flex max-w-full items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs">
      <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="truncate">{name}</span>
    </span>
  )
}
