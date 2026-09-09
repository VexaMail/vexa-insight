'use client'

import { ChevronRight } from 'lucide-react'
import { useXmlViewerCollapsible } from '../../hooks/reports/useXmlViewerCollapsible'
import { LazyXmlViewer } from './LazyXmlViewer'
import { XmlViewerActions } from './XmlViewerActions'
import type { XmlViewerCollapsibleProps } from './XmlViewerCollapsibleProps'
import { XmlViewerEmpty } from './XmlViewerEmpty'

export function XmlViewerCollapsible({
  rawXml,
}: Readonly<XmlViewerCollapsibleProps>) {
  const { isOpen, handleToggle, handleCopy, handleDownload } =
    useXmlViewerCollapsible(rawXml)

  if (!rawXml) return <XmlViewerEmpty />

  return (
    <details
      className="group rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"
      onToggle={handleToggle}
    >
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 select-none">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <ChevronRight
            className="h-4 w-4 transition-transform group-open:rotate-90"
            aria-hidden="true"
          />
          Raw XML
        </div>
        {isOpen ? (
          <XmlViewerActions onCopy={handleCopy} onDownload={handleDownload} />
        ) : null}
      </summary>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-700">
        {isOpen ? <LazyXmlViewer rawXml={rawXml} /> : null}
      </div>
    </details>
  )
}
