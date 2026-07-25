import { SectionHeader } from '@/components/diagnostics'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('SectionHeader accessibility', () => {
  it('has no axe violations for a found protocol with help text', async () => {
    const { container } = render(
      <main>
        <h1>example.com</h1>
        <h2>Protocols</h2>
        <SectionHeader
          title="SPF"
          found
          helpText="SPF lists the servers allowed to send mail for your domain."
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations for a missing protocol without help text', async () => {
    const { container } = render(
      <main>
        <h1>example.com</h1>
        <h2>Protocols</h2>
        <SectionHeader title="BIMI" found={false} />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
