import { ApiKeySection } from '@/components/settings'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

describe('ApiKeySection accessibility', () => {
  const renderSection = (apiKey: string) =>
    render(
      <main>
        <h1>Settings</h1>
        <ApiKeySection apiKey={apiKey} onCopy={vi.fn()} />
      </main>,
    )

  it('has no axe violations with a key configured', async () => {
    const { container } = renderSection('secret-key')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  // The copy button is disabled while there is no key, and a disabled control
  // is still part of the audited tree.
  it('has no axe violations without a key', async () => {
    const { container } = renderSection('')

    expect(screen.getByRole('button', { name: 'Copy API key' })).toBeDisabled()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  // The section is a framer-motion element that starts at `opacity: 0`, and
  // jsdom never advances the animation, so `toBeVisible` would fail on every
  // node here for a reason unrelated to accessibility. Resolving each control
  // by role *and* accessible name is the assertion that matters.
  it('names the field and the icon-only button', () => {
    renderSection('secret-key')

    expect(
      screen.getByRole('textbox', { name: 'Current API key' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Copy API key' }),
    ).toBeInTheDocument()
  })

  // Rotation left the settings page with ADR 0010: the key comes from the
  // environment, which a running instance cannot rewrite for itself.
  it('offers no way to set a new key', () => {
    renderSection('secret-key')

    expect(screen.queryAllByRole('textbox')).toHaveLength(1)
    expect(
      screen.queryByRole('button', { name: 'Generate new API key' }),
    ).toBeNull()
  })
})
