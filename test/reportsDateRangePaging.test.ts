import { runMigrations } from '@/lib/db'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

const IN_RANGE_END = 1780272000 // 2026-06-01T00:00:00Z
const OUT_OF_RANGE_END = 1767225600 // 2026-01-01T00:00:00Z

const reportXml = (reportId: string, end: number): Buffer =>
  Buffer.from(`<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <report_metadata>
    <org_name>example.net</org_name>
    <email>dmarc-reports@example.net</email>
    <report_id>${reportId}</report_id>
    <date_range><begin>${String(end - 86400)}</begin><end>${String(end)}</end></date_range>
  </report_metadata>
  <policy_published><domain>example.com</domain><p>none</p></policy_published>
  <record>
    <row>
      <source_ip>192.0.2.10</source_ip>
      <count>1</count>
      <policy_evaluated><disposition>none</disposition><dkim>pass</dkim><spf>pass</spf></policy_evaluated>
    </row>
    <identifiers><header_from>example.com</header_from></identifiers>
    <auth_results><spf><domain>example.com</domain><result>pass</result></spf></auth_results>
  </record>
</feedback>`)

const inRangeIds = Array.from({ length: 30 }, (_, i) => `in-range-${String(i)}`)

describe('date-filtered reports list paging', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(async () => {
    resetDmarcDb()
    const { ingestParsedReport } = await import('@/services/reports')
    const { parseDmarcXml } = await import('@/utils/dmarc')
    for (const [i, id] of inRangeIds.entries()) {
      const xml = reportXml(id, IN_RANGE_END + i * 3600)
      const result = await ingestParsedReport(parseDmarcXml(xml))
      expect(result.ingested).toBe(true)
    }
    for (const id of ['out-of-range-0', 'out-of-range-1']) {
      const result = await ingestParsedReport(
        parseDmarcXml(reportXml(id, OUT_OF_RANGE_END)),
      )
      expect(result.ingested).toBe(true)
    }
  })

  it('counts every report in the range and serves the requested page', async () => {
    const { getReportsInDateRange } = await import('@/services/reports')
    const range = {
      from: new Date('2026-05-15T00:00:00Z'),
      to: new Date('2026-06-30T00:00:00Z'),
      pageSize: 25,
    }

    const first = await getReportsInDateRange({ ...range, page: 1 })
    const second = await getReportsInDateRange({ ...range, page: 2 })

    expect(first.total).toBe(30)
    expect(second.total).toBe(30)
    expect(first.page).toBe(1)
    expect(second.page).toBe(2)
    expect(first.items).toHaveLength(25)
    expect(second.items).toHaveLength(5)

    const seen = [...first.items, ...second.items].map((r) => r.reportId)
    expect(new Set(seen).size).toBe(30)
    expect([...seen].sort()).toEqual([...inRangeIds].sort())
    expect(second.items[0]?.dmarcOutcome).toEqual({
      totalMessages: 1,
      failingMessages: 0,
    })
    expect(second.items[0]?.relatedDomains?.map((d) => d.domainName)).toEqual([
      'example.com',
    ])
  })

  it('applies the org filter to both the count and the page', async () => {
    const { getReportsInDateRange } = await import('@/services/reports')
    const result = await getReportsInDateRange({
      from: new Date('2026-05-15T00:00:00Z'),
      page: 1,
      pageSize: 25,
      org: 'example.org',
    })
    expect(result).toEqual({ items: [], total: 0, page: 1, pageSize: 25 })
  })
})
