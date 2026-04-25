import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ReportTransportSecurityPrimer } from '@/components/reports'

describe('ReportTransportSecurityPrimer', () => {
  it('renders RFC links with noopener noreferrer and stable hrefs', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ReportTransportSecurityPrimer),
    )

    expect(markup).toContain(
      'Transport security primer (MTA-STS &amp; TLS-RPT)',
    )
    expect(markup).toContain('https://www.rfc-editor.org/rfc/rfc8461')
    expect(markup).toContain('https://www.rfc-editor.org/rfc/rfc8460')
    expect(markup).toContain('rel="noopener noreferrer"')
    expect(markup).toContain('target="_blank"')
  })

  it('includes domain hint line when domainHints are passed', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ReportTransportSecurityPrimer, {
        domainHints: ['example.com', 'example.org'],
      }),
    )

    expect(markup).toContain('example.com, example.org')
    expect(markup).toContain('list every MX hostname')
  })
})
