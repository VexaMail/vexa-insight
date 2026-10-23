import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildDkimFinding } from '../src/utils/diagnostics/buildDkimFinding'
import { mockResolveMx } from './mockResolveMx'
import { mockResolveTxt } from './mockResolveTxt'
import { diagnosticsTestDomain } from './setup/diagnosticsTestDomain'
import { dkimRevocationRecord } from './setup/dkimRevocationRecord'
import { dkimRsa2048PublicKey } from './setup/dkimRsa2048PublicKey'

vi.mock('node:dns/promises', () => ({
  default: { resolveTxt: mockResolveTxt, resolveMx: mockResolveMx },
}))
afterEach(() => vi.resetAllMocks())

describe('wildcard selector answers', () => {
  it('does not turn a catch-all revocation into broken common signing keys', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([[dkimRevocationRecord]])
    mockResolveMx.mockResolvedValue([])
    const dns = await getDomainDnsRecords(diagnosticsTestDomain)
    expect(
      dns.dkim.every(
        (record) => record.record === null && record.wildcardRevocation,
      ),
    ).toBe(true)
    expect(buildDkimFinding(dns)).toMatchObject({
      severity: 'info',
      tileValue: 'None found',
    })
    expect(buildDkimFinding(dns).detail).toContain('negative DNS wildcard')
  })

  it('keeps the same revoked key actionable when the selector was used in reports', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([[dkimRevocationRecord]])
    mockResolveMx.mockResolvedValue([])
    const dns = await getDomainDnsRecords(diagnosticsTestDomain, ['actual'])
    expect(
      dns.dkimParsedRecords.find((record) => record.selector === 'actual'),
    ).toMatchObject({ valid: false, publicKeyPresent: false })
    expect(buildDkimFinding(dns)).toMatchObject({
      severity: 'high',
      tileValue: 'Invalid',
    })
  })

  it('ignores unrelated wildcard TXT records instead of labeling them revoked', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockResolvedValue([['v=spf1 -all']])
    mockResolveMx.mockResolvedValue([])
    const dns = await getDomainDnsRecords(diagnosticsTestDomain)
    expect(dns.dkim.every((record) => record.record === null)).toBe(true)
    expect(buildDkimFinding(dns).severity).toBe('info')
  })

  it('retains a real selector overriding a negative wildcard', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) =>
      Promise.resolve(
        host === 'hostingcp._domainkey.example.com'
          ? [[`v=DKIM1; p=${dkimRsa2048PublicKey}`]]
          : [[dkimRevocationRecord]],
      ),
    )
    mockResolveMx.mockResolvedValue([])
    const dns = await getDomainDnsRecords(diagnosticsTestDomain)
    expect(
      dns.dkimParsedRecords.find((record) => record.selector === 'hostingcp'),
    ).toMatchObject({ valid: true, keyLengthBits: 2048 })
    expect(buildDkimFinding(dns)).toMatchObject({
      severity: 'pass',
      tileValue: 'Valid',
    })
  })
})
