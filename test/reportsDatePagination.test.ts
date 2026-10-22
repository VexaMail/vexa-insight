// @vitest-environment jsdom

import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useReportsTable } from '../src/hooks/reports/useReportsTable'

const dates = vi.hoisted(() => ({ query: 'days=30' }))

vi.mock('@/hooks/useDateFilterParams', () => ({
  useDateFilterParams: () => dates.query,
}))
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ replace: vi.fn() }),
}))

const request = vi.fn(async (input: string) => {
  const url = new URL(input, 'https://example.invalid')
  return Promise.resolve({
    json: async () =>
      Promise.resolve({
        data:
          url.pathname === '/api/v1/reports'
            ? {
                items: [],
                total: 100,
                page: Number(url.searchParams.get('page')),
                pageSize: 25,
              }
            : [],
      }),
  })
})

beforeEach(() => {
  dates.query = 'days=30'
  request.mockClear()
  vi.stubGlobal('fetch', request)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

it.each(['days=7', 'from=2026-10-01&to=2026-10-02', 'from=2026-10-01'])(
  'fetches only page one when the date range becomes %s',
  async (query) => {
    const { result, rerender } = renderHook(() => useReportsTable({}))
    await waitFor(() => {
      expect(result.current.state.loading).toBe(false)
    })
    act(() => {
      result.current.dispatch({ type: 'SET_PAGE', payload: 3 })
    })
    await waitFor(() => {
      expect(result.current.state.data?.page).toBe(3)
    })
    request.mockClear()
    dates.query = query
    rerender()
    await waitFor(() => {
      expect(result.current.state.loading).toBe(false)
    })
    const reports = request.mock.calls
      .map(([input]) => new URL(input, 'https://example.invalid'))
      .filter((url) => url.pathname === '/api/v1/reports')
    expect(reports.map((url) => url.searchParams.get('page'))).toEqual(['1'])
    expect(result.current.state.page).toBe(1)
    act(() => {
      result.current.dispatch({ type: 'SET_PAGE', payload: 2 })
    })
    await waitFor(() => {
      expect(result.current.state.data?.page).toBe(2)
    })
  },
)

it('preserves the current page when the date range does not change', async () => {
  const { result, rerender } = renderHook(() => useReportsTable({}))
  await waitFor(() => {
    expect(result.current.state.loading).toBe(false)
  })
  act(() => {
    result.current.dispatch({ type: 'SET_PAGE', payload: 3 })
  })
  await waitFor(() => {
    expect(result.current.state.data?.page).toBe(3)
  })
  request.mockClear()
  rerender()
  expect(result.current.state.page).toBe(3)
  expect(request).not.toHaveBeenCalled()
})
