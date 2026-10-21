// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { writePublicReportClipboard } from '../src/components/public-site/writePublicReportClipboard'

afterEach(() => {
  vi.useRealTimers()
})

describe('public report clipboard fallback', () => {
  it('does not leave the share action waiting indefinitely for browser permission', async () => {
    vi.useFakeTimers()
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockReturnValue(new Promise<void>(() => {})),
      },
    })
    await Promise.all([
      expect(
        writePublicReportClipboard('https://insight.vexamail.com/example.com'),
      ).rejects.toThrow('Clipboard access did not complete'),
      vi.advanceTimersByTimeAsync(1500),
    ])
    expect(vi.getTimerCount()).toBe(0)
  })
})
