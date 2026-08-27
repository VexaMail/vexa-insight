'use client'

import { useXmlViewer } from '@/hooks/reports'
import Editor from '@monaco-editor/react'
import type { XmlViewerProps } from './XmlViewerProps'

export default function XmlViewer({ rawXml }: Readonly<XmlViewerProps>) {
  const { editorTheme } = useXmlViewer()

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
      <Editor
        height="100%"
        defaultLanguage="xml"
        value={rawXml}
        theme={editorTheme}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
        }}
      />
    </div>
  )
}
