import { Button } from '@/components/ui'
import { ClipboardCopy, Download } from 'lucide-react'
import type { XmlViewerActionsProps } from './XmlViewerActionsProps'

/** Copy and download buttons of the raw XML panel. */
export function XmlViewerActions({
  onCopy,
  onDownload,
}: Readonly<XmlViewerActionsProps>) {
  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" size="sm" onClick={onCopy}>
        <ClipboardCopy aria-hidden="true" />
        Copy
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={onDownload}>
        <Download aria-hidden="true" />
        Download
      </Button>
    </div>
  )
}
