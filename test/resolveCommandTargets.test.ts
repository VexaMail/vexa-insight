import { resolveCommandTargets } from '@/utils/shell'
import { describe, expect, it } from 'vitest'

const DOMAINS = ['example.com', 'example.org', 'shop.example.net']

describe('resolveCommandTargets', () => {
  it('returns nothing for an empty query', () => {
    expect(resolveCommandTargets('  ', DOMAINS)).toEqual([])
  })

  it('opens an IPv4 address as a sending source', () => {
    expect(resolveCommandTargets('192.0.2.10', DOMAINS)[0]).toEqual({
      label: '192.0.2.10',
      hint: 'Sending source',
      href: '/ips/192.0.2.10',
    })
  })

  it('opens an IPv6 literal as a sending source, encoded', () => {
    expect(resolveCommandTargets('2001:db8::1', DOMAINS)[0]?.href).toBe(
      '/ips/2001%3Adb8%3A%3A1',
    )
  })

  it('rejects a dotted quad with an octet over 255', () => {
    const hrefs = resolveCommandTargets('300.1.1.1', DOMAINS).map((t) => t.href)
    expect(hrefs.some((href) => href.startsWith('/ips/'))).toBe(false)
  })

  it('opens a number as a report id', () => {
    expect(resolveCommandTargets('14435', DOMAINS)[0]?.href).toBe(
      '/reports/14435',
    )
  })

  it('lists monitored domains containing the text, then diagnostics', () => {
    expect(
      resolveCommandTargets('Example', DOMAINS).map((t) => t.href),
    ).toEqual([
      '/domains/example.com',
      '/domains/example.org',
      '/domains/shop.example.net',
      '/diagnostics/example.com',
    ])
  })

  it('offers an unmonitored domain name typed in full', () => {
    expect(
      resolveCommandTargets('other.test', DOMAINS).map((t) => t.href),
    ).toEqual(['/domains/other.test', '/diagnostics/other.test'])
  })
})
