import { parseDmarcFileToResult } from '@/utils/dmarc'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const FIXTURE = readFileSync(
  path.join(__dirname, 'fixtures', 'dmarc', 'rfc9990-example.xml'),
)

describe('RFC 9990 aggregate report (dmarc-2.0 namespace)', () => {
  it('parses the example report of RFC 9990', async () => {
    const result = await parseDmarcFileToResult(FIXTURE, 'report.xml')
    expect(result).not.toBeNull()
    expect(result?.domain).toBe('example.com')
    expect(result?.rawReport).toMatchObject({
      reportId: '3v98abbp8ya9n3va8yr8oa3ya',
      orgName: 'Sample Reporter',
      beginDate: 302832000,
      endDate: 302918399,
    })
    expect(result?.events).toHaveLength(1)
    expect(result?.events[0]).toMatchObject({
      sourceIp: '192.0.2.123',
      count: 123,
      dkimAligned: true,
      spfAligned: false,
    })
  })
})
