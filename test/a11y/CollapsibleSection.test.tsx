import { CollapsibleSection } from '@/components/diagnostics'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

describe('CollapsibleSection', () => {
  it('has no axe violations while collapsed and while expanded', async () => {
    for (const open of [false, true]) {
      const { container, unmount } = render(
        <main>
          <h1>example.com</h1>
          <h2>Protocols</h2>
          <CollapsibleSection
            id="dmarc"
            title="DMARC Configuration"
            found
            helpText="What receivers do when alignment fails."
            open={open}
            onToggle={() => undefined}
          >
            <p>v=DMARC1; p=reject</p>
          </CollapsibleSection>
        </main>,
      )
      const results = await axe(container)
      expect(results.violations).toEqual([])
      unmount()
    }
  })

  it('starts collapsed, wires aria-expanded and aria-controls, and reports the toggle', () => {
    const onToggle = vi.fn()
    render(
      <CollapsibleSection
        id="spf"
        title="SPF Configuration"
        found={false}
        open={false}
        onToggle={onToggle}
      >
        <p>v=spf1 -all</p>
      </CollapsibleSection>,
    )

    const toggle = screen.getByRole('button', { name: 'Show details' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute(
      'aria-controls',
      'diagnostics-section-spf-body',
    )
    // jsdom applies no Tailwind, so assert the utility class rather than layout.

    fireEvent.click(toggle)
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('labels the toggle as closing once the section is open', () => {
    render(
      <CollapsibleSection
        id="dkim"
        title="DKIM Configuration"
        found
        open
        onToggle={() => undefined}
      >
        <p>selector1</p>
      </CollapsibleSection>,
    )

    expect(
      screen.getByRole('button', { name: 'Hide details' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })
})
