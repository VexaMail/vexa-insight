'use client'

import { ChevronRight, ClipboardCopy, Download } from 'lucide-react'
import { useXmlViewerCollapsible } from '../../hooks/reports/useXmlViewerCollapsible'
import { LazyXmlViewer } from './LazyXmlViewer'
import type { XmlViewerCollapsibleProps } from './XmlViewerCollapsibleProps'

export function XmlViewerCollapsible({
  rawXml,
}: Readonly<XmlViewerCollapsibleProps>) {
  const { isOpen, handleToggle, handleCopy, handleDownload } =
    useXmlViewerCollapsible(rawXml)

  if (!rawXml) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No XML data available for this report.
        </p>
      </div>
    )
  }

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download
            </button>
          </div>
        ) : null}
      </summary>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-700">
        {isOpen ? <LazyXmlViewer rawXml={rawXml} /> : null}
      </div>
    </details>
  )
}
