import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from '../app/api/public/domain-check/route'
import { allowPublicCheck } from '../src/services/public-check/allowPublicCheck'
import { getPublicDomainReport } from '../src/services/public-check/getPublicDomainReport'
import { publicCheckState } from '../src/services/public-check/publicCheckState'
import { runPublicDomainCheck } from '../src/services/public-check/runPublicDomainCheck'

vi.mock('../src/services/public-check/runPublicDomainCheck', () => ({
  runPublicDomainCheck: vi.fn(),
}))
beforeEach(() => {
  vi.clearAllMocks()
  publicCheckState.cache.clear()
  publicCheckState.callers.clear()
  publicCheckState.pending.clear()
  publicCheckState.count = 0
  publicCheckState.startedAt = 0
})

describe('public checker resource limits', () => {
  const domain = 'example.com'
  it('rejects invalid domains before starting any DNS work', async () => {
    const response = await GET(
      new NextRequest(
        'https://insight.vexamail.com/api/public/domain-check?domain=localhost',
      ),
    )
    expect(response.status).toBe(400)
    expect(runPublicDomainCheck).not.toHaveBeenCalled()
  })
  it('limits callers and applies a process-wide ceiling', () => {
    for (let index = 0; index < 10; index += 1)
      expect(allowPublicCheck('one')).toBe(true)
    expect(allowPublicCheck('one')).toBe(false)
    for (let index = 0; index < 49; index += 1)
      expect(allowPublicCheck(`caller-${String(index)}`)).toBe(true)
    expect(allowPublicCheck('another')).toBe(false)
  })
  it('deduplicates concurrent checks and serves the timestamped cached report', async () => {
    const report = {
      domain,
      score: { value: null, spf: null, dmarc: null },
      checkedAt: '2026-10-21T00:00:00Z',
      checks: [],
    }
    vi.mocked(runPublicDomainCheck).mockResolvedValue(report)
    const responses = await Promise.all([
      getPublicDomainReport(domain),
      getPublicDomainReport(domain),
    ])
    expect(responses).toEqual([report, report])
    expect(await getPublicDomainReport(domain)).toEqual(report)
    expect(runPublicDomainCheck).toHaveBeenCalledTimes(1)
    expect(publicCheckState.pending.size).toBe(0)
  })
  it('does not cache failed DNS results as missing records', async () => {
    vi.mocked(runPublicDomainCheck).mockResolvedValue({
      domain,
      score: { value: null, spf: null, dmarc: null },
      checkedAt: 'now',
      checks: [
        {
          name: 'SPF',
          status: 'unknown',
          summary: '',
          recommendation: '',
          records: [],
        },
      ],
    })
    await getPublicDomainReport(domain)
    expect(publicCheckState.cache.has(domain)).toBe(false)
  })
  it('returns a retryable 503 before exceeding four DNS runs', async () => {
    vi.mocked(runPublicDomainCheck).mockImplementation(
      async () => new Promise(() => {}),
    )
    for (const domain of ['one.com', 'two.com', 'three.com', 'four.com'])
      void getPublicDomainReport(domain)
    const response = await GET(
      new NextRequest(
        'https://insight.vexamail.com/api/public/domain-check?domain=five.com',
      ),
    )
    expect(response.status).toBe(503)
    expect(response.headers.get('retry-after')).toBe('10')
    expect(runPublicDomainCheck).toHaveBeenCalledTimes(4)
  })
  it('returns 429 with Retry-After when the budget is exhausted', async () => {
    publicCheckState.startedAt = Date.now()
    publicCheckState.count = 60
    const response = await GET(
      new NextRequest(
        'https://insight.vexamail.com/api/public/domain-check?domain=example.com',
      ),
    )
    expect(response.status).toBe(429)
    expect(response.headers.get('retry-after')).toBe('60')
    expect(runPublicDomainCheck).not.toHaveBeenCalled()
  })
})
