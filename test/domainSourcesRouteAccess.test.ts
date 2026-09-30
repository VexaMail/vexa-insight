import type { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const getDomainSummary = vi.hoisted(() => vi.fn())
const getDomainSources = vi.hoisted(() => vi.fn())

vi.mock('@/services/api', () => ({
  withApiAuth: (handler: unknown) => handler,
}))
vi.mock('@/services/reports', () => ({ getDomainSummary, getDomainSources }))

const { GET } = await import('../app/api/v1/domains/[domainId]/sources/route')

async function call(domainId: string) {
  const request = new Request(
    `https://vexa.example.com/api/v1/domains/${domainId}/sources`,
  ) as unknown as NextRequest
  return GET(request, { params: Promise.resolve({ domainId }) })
}

describe('GET /api/v1/domains/{id}/sources', () => {
  beforeEach(() => {
    getDomainSummary.mockReset()
    getDomainSources.mockReset()
  })

  it('answers 404 for a domain outside the caller allow-list', async () => {
    getDomainSummary.mockResolvedValue(null)
    const res = await call('7')
    expect(res.status).toBe(404)
    expect(getDomainSources).not.toHaveBeenCalled()
  })

  it('returns the sources of an allowed domain', async () => {
    getDomainSummary.mockResolvedValue({ totalMessages: 1 })
    getDomainSources.mockResolvedValue([{ sourceIp: '192.0.2.1', count: 1 }])
    const res = await call('7')
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      data: [{ sourceIp: '192.0.2.1', count: 1 }],
    })
  })
})
