import { domainSourcesCsv, escapeCsvCell, toCsv } from '@/utils/csv'
import { describe, expect, it } from 'vitest'

describe('escapeCsvCell', () => {
  it('quotes commas, quotes and line breaks', () => {
    expect(escapeCsvCell('a,b')).toBe('"a,b"')
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""')
    expect(escapeCsvCell('two\nlines')).toBe('"two\nlines"')
  })

  it('defuses spreadsheet formulas in text', () => {
    expect(escapeCsvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`)
    expect(escapeCsvCell('@SUM(A1)')).toBe("'@SUM(A1)")
    expect(escapeCsvCell(-5)).toBe('-5')
  })

  it('leaves empty values empty', () => {
    expect(escapeCsvCell(null)).toBe('')
    expect(escapeCsvCell(undefined)).toBe('')
  })
})

describe('toCsv', () => {
  it('writes a header and CRLF-terminated rows', () => {
    expect(
      toCsv([{ a: 1 }, { a: 2 }], [{ header: 'a', value: (r) => r.a }]),
    ).toBe('a\r\n1\r\n2\r\n')
  })
})

describe('domainSourcesCsv', () => {
  it('lists each source with its sender', () => {
    const csv = domainSourcesCsv([
      {
        sourceIp: '192.0.2.1',
        count: 12,
        hostname: 'o1.sendgrid.net',
        countryCode: 'US',
        sender: {
          name: 'SendGrid',
          category: 'email-service',
          matchedOn: 'hostname',
        },
      },
      { sourceIp: '198.51.100.7', count: 3 },
    ])
    expect(csv.split('\r\n')).toEqual([
      'source_ip,messages,hostname,country,sender,sender_category',
      '192.0.2.1,12,o1.sendgrid.net,US,SendGrid,email-service',
      '198.51.100.7,3,,,,',
      '',
    ])
  })
})
