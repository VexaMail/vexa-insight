import { ClipboardCopy, Download } from 'lucide-react'
import { xmlViewerActionClassName } from './xmlViewerActionClassName'
import type { XmlViewerActionsProps } from './XmlViewerActionsProps'

/** Copy and download buttons shown while the raw XML is expanded. */
export function XmlViewerActions({
  onCopy,
  onDownload,
}: Readonly<XmlViewerActionsProps>) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onCopy}
        className={xmlViewerActionClassName}
      >
        <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" />
        Copy
      </button>
      <button
        type="button"
        onClick={onDownload}
        className={xmlViewerActionClassName}
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        Download
      </button>
    </div>
  )
}
