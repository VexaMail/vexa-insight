import { beforeEach, describe, expect, it, vi } from 'vitest'

const { resolveAndPersist, warn } = vi.hoisted(() => ({
  resolveAndPersist: vi.fn(),
  warn: vi.fn(),
}))

vi.mock('@/services/config', () => ({
  getConfig: () => ({ ipHostnameLookupEnabled: true, ipHostnameBatchSize: 10 }),
}))

vi.mock('@/lib/db', () => {
  const chain = {
    select: () => chain,
    from: () => chain,
    where: () => chain,
    limit: async () =>
      Promise.resolve([
        { ip: '192.0.2.1', id: 1 },
        { ip: '192.0.2.2', id: 2 },
      ]),
  }
  return { getDb: () => chain, ipHostnameEnrichments: {} }
})

vi.mock('@/services/ip-hostname/resolveAndPersist', () => ({
  resolveAndPersist,
}))

vi.mock('@/utils/log', () => ({
  log: { debug: vi.fn(), info: vi.fn(), warn, error: vi.fn() },
}))

const { processIpHostnameLookupJob } =
  await import('../src/services/job/processIpHostnameLookupJob')

describe('processIpHostnameLookupJob', () => {
  beforeEach(() => {
    resolveAndPersist.mockReset()
    warn.mockReset()
  })

  it('logs the IP and the error of each failed lookup', async () => {
    resolveAndPersist
      .mockResolvedValueOnce({
        hostname: null,
        status: 'failed',
        error: 'queryPtr ETIMEOUT',
        resolvedAt: new Date(),
      })
      .mockResolvedValueOnce({
        hostname: 'mail.example.com',
        status: 'success',
        error: null,
        resolvedAt: new Date(),
      })

    const result = await processIpHostnameLookupJob()

    expect(result).toEqual({ processed: 1, skipped: 0, errors: 1 })
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith('[ip-hostname-lookup] lookup failed', {
      ip: '192.0.2.1',
      error: 'queryPtr ETIMEOUT',
    })
  })
})
