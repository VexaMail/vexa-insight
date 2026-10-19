import { buildReportTabs, parseReportTab } from '@/utils/reports'
import { describe, expect, it } from 'vitest'

describe('buildReportTabs', () => {
  it('links the sources tab to the bare report URL', () => {
    const [sources] = buildReportTabs(12, 3, undefined)
    expect(sources?.href).toBe('/reports/12')
    expect(sources?.count).toBe(3)
  })

  it('keeps the domain the report was opened from on every tab', () => {
    const tabs = buildReportTabs(12, 3, 'example.com')
    expect(tabs.map((t) => t.href)).toEqual([
      '/reports/12?fromDomain=example.com',
      '/reports/12?tab=metadata&fromDomain=example.com',
      '/reports/12?tab=xml&fromDomain=example.com',
      '/reports/12?tab=transport&fromDomain=example.com',
    ])
  })
})

describe('parseReportTab', () => {
  it('falls back to the sources tab', () => {
    expect(parseReportTab(undefined)).toBe('sources')
    expect(parseReportTab('nope')).toBe('sources')
    expect(parseReportTab('xml')).toBe('xml')
  })
})
