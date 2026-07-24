import { InstallForm } from '@/components/install'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('InstallForm accessibility', () => {
  it('has no axe violations in full install mode', async () => {
    const { container } = render(
      <main>
        <InstallForm />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in partial install mode', async () => {
    const { container } = render(
      <main>
        <InstallForm isPartial />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
