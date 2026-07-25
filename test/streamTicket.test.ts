import { STREAM_TICKET_TTL_MS } from '@/constants/api'
import { consumeStreamTicket, issueStreamTicket } from '@/services/api'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('stream tickets', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('accepts a freshly issued ticket exactly once', () => {
    const ticket = issueStreamTicket()

    expect(consumeStreamTicket(ticket)).toBe(true)
    expect(consumeStreamTicket(ticket)).toBe(false)
  })

  it('rejects an unknown, empty, or missing ticket', () => {
    expect(consumeStreamTicket('not-a-ticket')).toBe(false)
    expect(consumeStreamTicket('')).toBe(false)
    expect(consumeStreamTicket(undefined)).toBe(false)
  })

  it('issues unpredictable, distinct tickets', () => {
    const tickets = Array.from({ length: 50 }, () => issueStreamTicket())

    expect(new Set(tickets).size).toBe(50)
    for (const ticket of tickets) expect(ticket).toMatch(/^[0-9a-f]{48}$/)
  })

  it('rejects a ticket past its TTL and does not leave it behind', () => {
    vi.useFakeTimers()
    const ticket = issueStreamTicket()

    vi.advanceTimersByTime(STREAM_TICKET_TTL_MS + 1)

    expect(consumeStreamTicket(ticket)).toBe(false)
    expect(consumeStreamTicket(ticket)).toBe(false)
  })
})
