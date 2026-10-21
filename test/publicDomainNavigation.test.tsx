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
      expect(window.location.pathname).toBe('/teleporte.es')
    })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'teleporte.es',
    )
    expect(fetchPublicReport).toHaveBeenCalledTimes(1)
  })
  it('loads a pasted domain URL without requiring a second submission', async () => {
    window.history.replaceState(null, '', '/teleporte.es')
    vi.mocked(fetchPublicReport).mockResolvedValue(report)
    render(<PublicDomainChecker initialDomain="teleporte.es" />)
    await waitFor(() => {
      expect(screen.getByText('SPF & DMARC configuration score')).toBeTruthy()
    })
    expect(fetchPublicReport).toHaveBeenCalledTimes(1)
  })
  it('clears the report when returning to the landing and ignores a late response', async () => {
    window.history.replaceState(null, '', '/teleporte.es')
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
    expect(screen.queryByText('SPF & DMARC configuration score')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      'Your domain sends email.',
    )
  })
})
