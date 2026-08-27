import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseDmarcXml } from '../src/utils/dmarc/parseDmarcXml'

describe('parseDmarcXml fixtures', () => {
  const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'dmarc')
  const cases: Array<{
    file: string
    domain: string
    reportId: string
    expectedEvents: number
  }> = [
    {
      file: 'google.xml',
      domain: 'example.com',
      reportId: '16823942947293847234',
      expectedEvents: 2,
    },
    {
      file: 'microsoft.xml',
      domain: 'example.com',
      reportId: '78c4f0a3-5681-4ad0-b6f1-2c0a7b441111',
      expectedEvents: 1,
    },
    {
      file: 'yahoo.xml',
      domain: 'example.com',
      reportId: 'yh20260601.1717372799.example.com',
      expectedEvents: 1,
    },
    {
      file: 'single-record.xml',
      domain: 'example.com',
      reportId: 'singlerec-2026-06',
      expectedEvents: 1,
    },
    {
      file: 'multi-record.xml',
      domain: 'example.com',
      reportId: 'multirec-2026-06-aaa',
      expectedEvents: 4,
    },
    {
      file: 'empty-records.xml',
      domain: 'example.com',
      reportId: 'zerorecs-2026-06',
      expectedEvents: 0,
    },
  ]

  for (const c of cases) {
    it(c.file, () => {
      const buf = readFileSync(path.join(FIXTURE_DIR, c.file))
      const result = parseDmarcXml(buf)
      expect(result.domain).toBe(c.domain)
      // fast-xml-parser may coerce all-digit ids to number; compare as string.
      expect(result.rawReport.reportId).toBe(c.reportId)
      expect(result.events).toHaveLength(c.expectedEvents)
    })
  }

  it('rejects DOCTYPE/ENTITY (regression for the billion-laughs fixture)', () => {
    const buf = readFileSync(path.join(FIXTURE_DIR, 'billion-laughs.xml'))
    expect(() => parseDmarcXml(buf)).toThrow(/DOCTYPE/)
  })
})
