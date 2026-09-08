import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockResolveMx } from './mockResolveMx'
import { mockResolveTxt } from './mockResolveTxt'

vi.mock('node:dns/promises', () => ({
  default: {
    resolveTxt: mockResolveTxt,
    resolveMx: mockResolveMx,
  },
}))

afterEach(() => {
  vi.resetAllMocks()
})

describe('getDomainDnsRecords — SPF', () => {
  it('returns valid SPF when a single v=spf1 record exists', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com')
        return Promise.resolve([['v=spf1 include:_spf.google.com -all']])
      return Promise.resolve([])
    })
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.spf).toBe('v=spf1 include:_spf.google.com -all')
    expect(result.spfValid).toBe(true)
    expect(result.spfWarning).toBeNull()
  })

  it('returns null SPF when no v=spf1 record exists', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([])
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.spf).toBeNull()
    expect(result.spfValid).toBe(false)
  })

  it('sets spfWarning when multiple SPF records are found', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com')
        return Promise.resolve([
          ['v=spf1 include:a.com ~all'],
          ['v=spf1 include:b.com ~all'],
        ])
      return Promise.resolve([])
    })
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.spfWarning).not.toBeNull()
    expect(result.spfWarning).toContain('Multiple SPF records')
  })

  it('sets spfWarning for ~all softfail policy', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com')
        return Promise.resolve([['v=spf1 include:_spf.google.com ~all']])
      return Promise.resolve([])
    })
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.spf).toBeTruthy()
    expect(result.spfWarning).not.toBeNull()
    expect(result.spfWarning).toContain('~all')
  })
})

describe('getDomainDnsRecords — DMARC', () => {
  it('extracts policy from DMARC record', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === '_dmarc.example.com')
        return Promise.resolve([
          ['v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com'],
        ])
      return Promise.resolve([])
    })
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.dmarc).toContain('v=DMARC1')
    expect(result.dmarcPolicy).toBe('quarantine')
    expect(result.dmarcValid).toBe(true)
  })

  it('marks dmarcValid true but warns when policy is none', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === '_dmarc.example.com')
        return Promise.resolve([
          ['v=DMARC1; p=none; rua=mailto:dmarc@example.com'],
        ])
      return Promise.resolve([])
    })
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.dmarcPolicy).toBe('none')
    expect(result.dmarcValid).toBe(true)
  })

  it('returns null dmarc when lookup fails', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([])
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    expect(result.dmarc).toBeNull()
    expect(result.dmarcPolicy).toBeNull()
    expect(result.dmarcValid).toBe(false)
  })
})

describe('getDomainDnsRecords — MX', () => {
  it('returns MX records sorted by priority', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([])
    mockResolveMx.mockResolvedValue([
      { priority: 20, exchange: 'alt1.aspmx.l.google.com' },
      { priority: 10, exchange: 'aspmx.l.google.com' },
    ])

    const result = await getDomainDnsRecords('example.com')

    expect(result.mx).toHaveLength(2)
    expect(result.mx[0]?.priority).toBe(10)
    expect(result.mx[0]?.exchange).toBe('aspmx.l.google.com')
    expect(result.mx[1]?.priority).toBe(20)
  })

  it('returns empty MX array when lookup fails', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([])
    mockResolveMx.mockRejectedValue(new Error('NXDOMAIN'))

    const result = await getDomainDnsRecords('example.com')

    expect(result.mx).toEqual([])
  })
})

describe('getDomainDnsRecords — DKIM', () => {
  it('marks a selector valid when DKIM1 record is found', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'google._domainkey.example.com')
        return Promise.resolve([['v=DKIM1; k=rsa; p=MIIBIjANBg...']])
      return Promise.resolve([])
    })
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    const googleSelector = result.dkim.find(
      (d: { selector: string }) => d.selector === 'google',
    )
    expect(googleSelector).toBeDefined()
    expect(googleSelector?.valid).toBe(true)
    expect(googleSelector?.record).toContain('v=DKIM1')
  })

  it('marks selector invalid when no record is found', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([])
    mockResolveMx.mockResolvedValue([])

    const result = await getDomainDnsRecords('example.com')

    for (const d of result.dkim) {
      expect(d.valid).toBe(false)
      expect(d.record).toBeNull()
    }
  })
})
