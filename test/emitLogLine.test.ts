import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/utils/log/shouldJson', () => ({ shouldJson: () => false }))

const { emit } = await import('../src/utils/log/emit')

describe('emit (text format)', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('prefixes each line with an ISO-8601 timestamp', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-02T03:04:05.678Z'))
    const out = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    emit('info', '[ingest] run: processed=1', { errors: 0 })

    expect(out).toHaveBeenCalledWith(
      '2026-01-02T03:04:05.678Z [info] [ingest] run: processed=1 {"errors":0}',
    )
  })
})
