import { IconTile } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { UploadDropZoneProps } from '@/types/upload'
import { Upload } from 'lucide-react'

/**
 * File drop target. Drag events are a pointer affordance with no keyboard
 * equivalent, so the wrapper is presentational and the label underneath keeps
 * the semantics of the file input.
 */
export function UploadDropZone({
  dragActive,
  onDrag,
  onDrop,
  onFileChange,
}: Readonly<UploadDropZoneProps>) {
  return (
    <div
      role="presentation"
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      <label
        htmlFor="upload-file"
        className={cn(
          'focus-within:ring-ring flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-4 py-10 text-center transition-colors focus-within:ring-2 sm:py-14',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border bg-secondary/30 hover:border-primary/50 hover:bg-primary/5',
        )}
      >
        <IconTile>
          <Upload aria-hidden="true" />
        </IconTile>
        <span className="font-display text-foreground text-sm font-semibold">
          {dragActive
            ? 'Release to add to the list'
            : 'Drop reports here, or click to choose them'}
        </span>
        <span className="text-muted-foreground text-xs">
          Aggregate DMARC (.xml, .gz, .gzip, .zip) and TLS-RPT (.json, .json.gz)
        </span>
        <input
          id="upload-file"
          type="file"
          name="file"
          accept=".xml,.gz,.gzip,.zip,.json"
          className="sr-only"
          multiple
          onChange={onFileChange}
        />
      </label>
    </div>
  )
}
