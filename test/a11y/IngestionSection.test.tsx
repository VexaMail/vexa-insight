import { IngestionSection } from '@/components/settings'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

describe('IngestionSection accessibility', () => {
  const renderSection = () =>
    render(
      <main>
        <h1>Settings</h1>
        <IngestionSection
          intervalMinutes={60}
          daysBack={30}
          onIntervalChange={vi.fn()}
          onDaysBackChange={vi.fn()}
        />
      </main>,
    )

  it('has no axe violations', async () => {
    const { container } = renderSection()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  // The section is a framer-motion element that starts at `opacity: 0`, and
  // jsdom never advances the animation, so `toBeVisible` would fail on every
  // node here for a reason unrelated to accessibility. Resolving each control
  // by role *and* accessible name is the assertion that matters.
  it('labels both numeric inputs', () => {
    renderSection()

    expect(
      screen.getByRole('spinbutton', { name: 'Interval (minutes)' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('spinbutton', { name: 'Days back' }),
    ).toBeInTheDocument()
  })
})
