// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PublicDomainChecker } from '../src/components/public-site/PublicDomainChecker'
import { fetchPublicReport } from '../src/components/public-site/fetchPublicReport'
import type { PublicDomainReport } from '../src/types/public-check/PublicDomainReport'

vi.mock('../src/components/public-site/fetchPublicReport', () => ({
  fetchPublicReport: vi.fn(),
}))
afterEach(cleanup)
beforeEach(() => {
  vi.clearAllMocks()
  window.history.replaceState(null, '', '/')
})

describe('public report navigation', () => {
  const reportPath = '/teleporte.es'
  const scoreHeading = 'SPF & DMARC configuration score'
  const report: PublicDomainReport = {
    domain: 'teleporte.es',
    checkedAt: '2026-10-21T00:00:00Z',
    checks: [],
    score: { value: 80, spf: 50, dmarc: 30 },
  }
  it('puts the normalized domain in the URL after a successful submission', async () => {
    vi.mocked(fetchPublicReport).mockResolvedValue(report)
    render(<PublicDomainChecker />)
    fireEvent.change(screen.getByLabelText('Your domain'), {
      target: { value: ' TELEPORTE.ES ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Check my domain' }))
    await waitFor(() => {
      expect(window.location.pathname).toBe(reportPath)
    })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'teleporte.es',
    )
    expect(fetchPublicReport).toHaveBeenCalledTimes(1)
  })
  it('loads a pasted domain URL without requiring a second submission', async () => {
    window.history.replaceState(null, '', reportPath)
    vi.mocked(fetchPublicReport).mockResolvedValue(report)
    render(<PublicDomainChecker initialDomain="teleporte.es" />)
    await waitFor(() => {
      expect(screen.getByText(scoreHeading)).toBeTruthy()
    })
    expect(fetchPublicReport).toHaveBeenCalledTimes(1)
  })
  it('clears the report when returning to the landing and ignores a late response', async () => {
    window.history.replaceState(null, '', reportPath)
    const deferred = Promise.withResolvers<PublicDomainReport>()
    vi.mocked(fetchPublicReport).mockReturnValue(deferred.promise)
    render(<PublicDomainChecker initialDomain="teleporte.es" />)
    act(() => {
      window.history.replaceState(null, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    await act(async () => {
      deferred.resolve(report)
      await deferred.promise
    })
    expect(window.location.pathname).toBe('/')
    expect(screen.queryByText(scoreHeading)).toBeNull()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      'Free DMARC & SPF checker',
    )
  })
  it('keeps the last successful report visible after an invalid retry', async () => {
    window.history.replaceState(null, '', reportPath)
    vi.mocked(fetchPublicReport)
      .mockResolvedValueOnce(report)
      .mockRejectedValueOnce(new Error('Enter a public domain.'))
    render(<PublicDomainChecker initialDomain="teleporte.es" />)
    await screen.findByText(scoreHeading)
    fireEvent.change(screen.getByLabelText('Your domain'), {
      target: { value: 'localhost' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Check my domain' }))
    await screen.findByRole('alert')
    expect(screen.getByText(scoreHeading)).toBeTruthy()
    expect(window.location.pathname).toBe(reportPath)
  })
  it('copies the canonical domain link and reports clipboard failure accessibly', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    window.history.replaceState(null, '', reportPath)
    vi.mocked(fetchPublicReport).mockResolvedValue(report)
    render(<PublicDomainChecker initialDomain="teleporte.es" />)
    fireEvent.click(
      await screen.findByRole('button', { name: 'Copy report link' }),
    )
    await screen.findByText('Report link copied')
    expect(writeText).toHaveBeenCalledWith(
      'https://insight.vexamail.com/teleporte.es',
    )
    writeText.mockRejectedValueOnce(new Error('Clipboard unavailable'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy report link' }))
    const fallback =
      await screen.findByLabelText<HTMLInputElement>('Report link')
    expect(fallback.value).toBe('https://insight.vexamail.com/teleporte.es')
  })
})
