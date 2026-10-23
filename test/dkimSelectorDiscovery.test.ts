import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockResolveMx } from './mockResolveMx'
import { mockResolveTxt } from './mockResolveTxt'
import { dkimRsa2048PublicKey } from './setup/dkimRsa2048PublicKey'

const DOMAIN = 'example.com'

vi.mock('node:dns/promises', () => ({
  default: {
    resolveTxt: mockResolveTxt,
    resolveMx: mockResolveMx,
  },
}))

afterEach(() => {
  vi.resetAllMocks()
})

describe('DKIM selector discovery', () => {
  it('discovers an Enhance selector without a v tag and joins chunks within one TXT record', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) =>
      Promise.resolve(
        host === 'hostingcp._domainkey.example.com'
          ? [
              [
                `k=rsa; p=${dkimRsa2048PublicKey.slice(0, 100)}`,
                dkimRsa2048PublicKey.slice(100),
              ],
            ]
          : [],
      ),
    )
    mockResolveMx.mockResolvedValue([])
    const dns = await getDomainDnsRecords(DOMAIN)
    expect(
      dns.dkimParsedRecords.find((record) => record.selector === 'hostingcp'),
    ).toMatchObject({
      valid: true,
      version: null,
      keyLengthBits: 2048,
      errors: [],
    })
  })

  it('rejects multiple TXT key records instead of concatenating them into a valid key', async () => {
    const { getDomainDnsRecords } =
      await import('../src/services/diagnostics/getDomainDnsRecords')
    mockResolveTxt.mockImplementation(async (host: string) =>
      Promise.resolve(
        host === 'hostingcp._domainkey.example.com'
          ? [
              [`v=DKIM1; p=${dkimRsa2048PublicKey}`],
              [`v=DKIM1; p=${dkimRsa2048PublicKey}`],
            ]
          : [],
      ),
    )
    mockResolveMx.mockResolvedValue([])
    const dns = await getDomainDnsRecords(DOMAIN)
    expect(
      dns.dkim.find((record) => record.selector === 'hostingcp')?.valid,
    ).toBe(false)
    expect(
      dns.dkimParsedRecords.find((record) => record.selector === 'hostingcp')
        ?.valid,
    ).toBe(false)
  })
})
