import {
  extractSndsAuthCode,
  isSndsAlertRow,
  parseSndsDataRows,
  parseSndsStatusRows,
  toSndsRedirectQuery,
} from '@/utils/snds'
import { describe, expect, it } from 'vitest'

/**
 * SNDS documents the CSV export's columns but not the JSON shape of its REST
 * API, so the parser matches field names loosely. These cases pin the
 * spellings it accepts and the values it derives from them.
 */
describe('SNDS report parsing', () => {
  const LISTED_IP = '203.0.113.1'

  it('reads CSV-style column names from a bare array', () => {
    const rows = parseSndsDataRows([
      {
        'IP Address': '192.0.2.10',
        'Activity start': '9/29/2026 12:00 AM',
        'Activity end': '9/29/2026 11:59 PM',
        'RCPT commands': '120',
        'DATA commands': 118,
        'Message recipients': '130',
        'Filter result': 'green',
        'Complaint rate': '< 0.1%',
        'Spam trap hits': '0',
        'Sample HELO': 'mail.example.com',
        'Sample MAIL FROM': 'sender@example.com',
      },
    ])
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      ip: '192.0.2.10',
      rcptCommands: 120,
      dataCommands: 118,
      messageRecipients: 130,
      filterResult: 'GREEN',
      complaintRate: 0.001,
      trapHits: 0,
      sampleHelo: 'mail.example.com',
      sampleMailFrom: 'sender@example.com',
    })
  })

  it('reads camelCase keys from a wrapped object and drops rows without an IP', () => {
    const rows = parseSndsDataRows({
      data: [
        {
          ipAddress: '198.51.100.7',
          filterResult: 'Yellow',
          complaintRate: 0.5,
          trapHits: 2,
        },
        { filterResult: 'GREEN' },
      ],
    })
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      ip: '198.51.100.7',
      filterResult: 'YELLOW',
      complaintRate: 0.005,
      trapHits: 2,
    })
  })

  it('returns nothing for an empty or unexpected body', () => {
    expect(parseSndsDataRows(null)).toEqual([])
    expect(parseSndsDataRows('')).toEqual([])
    expect(parseSndsDataRows({ data: [] })).toEqual([])
  })

  it('parses the IP status list', () => {
    const rows = parseSndsStatusRows([
      {
        'First IP': LISTED_IP,
        'Last IP': LISTED_IP,
        Blocked: 'Yes',
        Details: 'Junked due to user complaints',
      },
    ])
    expect(rows).toEqual([
      expect.objectContaining({
        firstIp: LISTED_IP,
        lastIp: LISTED_IP,
        blocked: 'Yes',
        details: 'Junked due to user complaints',
      }),
    ])
  })

  it('flags non-green results, high complaint rates and trap hits', () => {
    const [base] = parseSndsDataRows([
      {
        ip: '192.0.2.1',
        filterResult: 'GREEN',
        complaintRate: '0.1%',
        trapHits: 0,
      },
    ])
    if (!base) throw new Error('fixture did not parse')
    expect(isSndsAlertRow(base)).toBe(false)
    expect(isSndsAlertRow({ ...base, filterResult: 'RED' })).toBe(true)
    expect(isSndsAlertRow({ ...base, complaintRate: 0.004 })).toBe(true)
    expect(isSndsAlertRow({ ...base, trapHits: 1 })).toBe(true)
  })

  it('reads the code from a pasted redirect address, or its error', () => {
    expect(
      extractSndsAuthCode('http://localhost/?code=M.C1_abc&state=x'),
    ).toEqual({ code: 'M.C1_abc' })
    expect(extractSndsAuthCode('  M.C1_bare  ')).toEqual({ code: 'M.C1_bare' })
    expect(
      extractSndsAuthCode(
        'http://localhost/?error=access_denied&error_description=Denied',
      ),
    ).toEqual({ error: 'Denied' })
    expect(extractSndsAuthCode('')).toHaveProperty('error')
  })

  it('sends only the query string, so a firewall does not see localhost', () => {
    const query = toSndsRedirectQuery(
      ' http://localhost/?code=M.C1_abc&state=x ',
    )
    expect(query).toBe('code=M.C1_abc&state=x')
    expect(extractSndsAuthCode(query)).toEqual({ code: 'M.C1_abc' })
    expect(toSndsRedirectQuery('M.C1_bare')).toBe('M.C1_bare')
  })
})
