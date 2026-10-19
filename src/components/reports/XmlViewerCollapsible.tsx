'use client'

import { FileCode2 } from 'lucide-react'
import { useXmlViewerCollapsible } from '../../hooks/reports/useXmlViewerCollapsible'
import { ReportCollapsible } from './ReportCollapsible'
import { XmlViewer } from './XmlViewer'
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
    <ReportCollapsible
      title="Raw XML"
      icon={<FileCode2 />}
      onToggle={handleToggle}
      actions={
        isOpen ? (
          <XmlViewerActions onCopy={handleCopy} onDownload={handleDownload} />
        ) : null
      }
    >
      {isOpen ? <XmlViewer rawXml={rawXml} /> : null}
    </ReportCollapsible>
  )
}
