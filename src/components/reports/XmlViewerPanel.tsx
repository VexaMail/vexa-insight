'use client'

import { Panel } from '@/components/ui'
import { FileCode2 } from 'lucide-react'
import { useXmlViewerActions } from '../../hooks/reports/useXmlViewerActions'
import { XmlViewer } from './XmlViewer'
import { XmlViewerActions } from './XmlViewerActions'
import type { XmlViewerPanelProps } from './XmlViewerPanelProps'

/** The report XML as received, with copy and download. */
export function XmlViewerPanel({ rawXml }: Readonly<XmlViewerPanelProps>) {
  const { handleCopy, handleDownload } = useXmlViewerActions(rawXml)
  return (
    <Panel
      icon={<FileCode2 />}
      title="Raw XML"
      description="The aggregate report exactly as the receiver sent it."
      actions={
        <XmlViewerActions onCopy={handleCopy} onDownload={handleDownload} />
      }
    >
      <XmlViewer rawXml={rawXml} />
    </Panel>
  )
}
