import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { IpFlag } from '@/components/ips'

describe('IpFlag', () => {
  it('renders stable server markup without tooltip wrappers', () => {
    const markup = renderToStaticMarkup(
      React.createElement(IpFlag, {
        countryCode: 'DE',
        countryName: 'Germany',
      }),
    )

    expect(markup).toContain('title="Germany (DE)"')
    expect(markup).not.toContain('data-state=')
  })
})
