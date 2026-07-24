import { EmptyState } from '@/components/ui'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('EmptyState accessibility', () => {
  it('has no axe violations with text content', async () => {
    const { container } = render(
      <main>
        <EmptyState>No reports found for the selected period.</EmptyState>
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
