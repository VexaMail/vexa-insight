import { XmlViewer } from '@/components/reports'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

describe('XmlViewer', () => {
  const xml =
    '<?xml version="1.0"?>\n<feedback>\n  <version>1.0</version>\n</feedback>'

  function render(): string {
    return renderToStaticMarkup(React.createElement(XmlViewer, { rawXml: xml }))
  }

  it('numbers every line of the document', () => {
    const html = render()

    expect(html).toContain('>1<')
    expect(html).toContain('>4<')
  })

  it('renders the document as text, not as an editable control', () => {
    const html = render()

    expect(html).not.toContain('<textarea')
    expect(html).not.toContain('contenteditable')
  })

  it('keeps the XML content intact', () => {
    const html = render()

    expect(html).toContain('feedback')
    expect(html).toContain('1.0')
  })
})
