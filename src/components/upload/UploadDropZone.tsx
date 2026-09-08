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
}: Readonly<{
  dragActive: boolean
  onDrag: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}>) {
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
        className={`glass-card-hover flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed p-12 transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border/50 hover:border-primary/30'
        }`}
      >
        <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-xl">
          <Upload className="h-7 w-7" />
        </div>
        <div className="text-center">
          <p className="font-display text-foreground text-sm font-semibold">
            Drop your DMARC report here
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Supports .xml, .gz, .gzip, and .zip files
          </p>
        </div>
        <input
          id="upload-file"
          type="file"
          name="file"
          accept=".xml,.gz,.gzip,.zip"
          className="sr-only"
          required
        />
      </label>
    </div>
  )
}
