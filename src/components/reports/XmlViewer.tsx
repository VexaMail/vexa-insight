import { splitXmlLines } from '@/utils/reports'
import { XmlLineRow } from './XmlLineRow'
import type { XmlViewerProps } from './XmlViewerProps'

/**
 * Read-only, syntax-coloured view of the report XML. Plain DOM rather than an
 * embedded editor: the editor mounted inside a <details> mis-measured itself,
 * which is what put a stray input box over the document and made scrolling skip
 * lines.
 */
export function XmlViewer({ rawXml }: Readonly<XmlViewerProps>) {
  return (
    <div className="max-h-[600px] overflow-auto rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/40">
      <pre className="w-max min-w-full py-3 font-mono text-[13px] leading-5">
        {splitXmlLines(rawXml).map((line) => (
          <XmlLineRow key={line.number} line={line} />
        ))}
      </pre>
    </div>
  )
}
