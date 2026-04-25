import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { IpAddressLink } from '@/components/ips'

vi.mock('next/link', () => ({
  default: ({
    children,
    onClick,
  }: Readonly<{
    children: React.ReactNode
    onClick?: unknown
  }>) => {
    if (onClick) {
      throw new Error('next/link received onClick during server render')
    }

    return React.createElement('a', undefined, children)
  },
}))

describe('IpAddressLink', () => {
  it('does not pass onClick to next/link during server render', () => {
    expect(() =>
      renderToStaticMarkup(
        React.createElement(IpAddressLink, {
          ip: '203.0.113.10',
          ipAsLink: true,
        }),
      ),
    ).not.toThrow()
  })
})
