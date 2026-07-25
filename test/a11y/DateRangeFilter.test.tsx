import { DateRangeFilter } from '@/components/filters'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams('days=30'),
}))

describe('DateRangeFilter accessibility', () => {
  it('has no axe violations in its default preset state', async () => {
    const { container } = render(
      <main>
        <h1>Dashboard</h1>
        <DateRangeFilter currentDays={30} basePath="/dashboard" />
      </main>,
    )

    // Pins the fix for the missing accessible name: SelectValue renders no
    // text until the matching SelectItem mounts, so the trigger carries an
    // explicit aria-label.
    expect(screen.getByRole('combobox', { name: 'Date range' })).toBeVisible()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in custom-range mode with the calendar trigger shown', async () => {
    const { container } = render(
      <main>
        <h1>Dashboard</h1>
        <DateRangeFilter
          currentDays={0}
          basePath="/dashboard"
          from={new Date('2026-07-01T00:00:00Z')}
          to={new Date('2026-07-31T00:00:00Z')}
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
