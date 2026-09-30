import { beforeEach, describe, expect, it, vi } from 'vitest'
import { deliverWebhookWithRetry } from '../src/services/notifications/deliverWebhookWithRetry'

const safeFetch = vi.hoisted(() => vi.fn())
vi.mock('@/services/security', () => ({ safeFetch }))

const REQUEST = {
  url: 'https://hooks.example.com/vexa',
  body: '{}',
  signature: null,
}
const DELAYS = [1, 2, 3]

function answered(status: number) {
  return { ok: true, status, dispatched: true, response: null, error: null }
}

function failed(code: string) {
  return {
    ok: false,
    status: null,
    dispatched: false,
    response: null,
    error: { code, message: code.toLowerCase() },
  }
}

describe('deliverWebhookWithRetry', () => {
  const wait = vi.fn(async (_ms: number) => {})

  beforeEach(() => {
    safeFetch.mockReset()
    wait.mockClear()
  })

  it('delivers a 500 followed by a 200 on the second attempt', async () => {
    safeFetch.mockResolvedValueOnce(answered(500))
    safeFetch.mockResolvedValueOnce(answered(200))
    const result = await deliverWebhookWithRetry(REQUEST, DELAYS, wait)
    expect(result).toMatchObject({ status: 200, error: null, attempts: 2 })
    expect(wait).toHaveBeenCalledWith(1)
  })

  it('does not retry a 404', async () => {
    safeFetch.mockResolvedValue(answered(404))
    const result = await deliverWebhookWithRetry(REQUEST, DELAYS, wait)
    expect(result).toMatchObject({ status: 404, attempts: 1 })
    expect(safeFetch).toHaveBeenCalledTimes(1)
  })

  it('retries 429 and timeouts, then gives up after the last delay', async () => {
    safeFetch.mockResolvedValueOnce(answered(429))
    safeFetch.mockResolvedValue(failed('TIMEOUT'))
    const result = await deliverWebhookWithRetry(REQUEST, DELAYS, wait)
    expect(result).toMatchObject({ error: 'TIMEOUT: timeout', attempts: 4 })
    expect(wait.mock.calls.map(([ms]) => ms)).toEqual(DELAYS)
  })

  it('does not retry a URL the SSRF guard rejected', async () => {
    safeFetch.mockResolvedValue(failed('PRIVATE_HOST_NOT_ALLOWED'))
    const result = await deliverWebhookWithRetry(REQUEST, DELAYS, wait)
    expect(result.attempts).toBe(1)
  })

  it('makes a single attempt with no delays', async () => {
    safeFetch.mockResolvedValue(answered(503))
    const result = await deliverWebhookWithRetry(REQUEST, [], wait)
    expect(result.attempts).toBe(1)
  })
})
