import { UnifiedPagination } from '@/components/ui'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

describe('UnifiedPagination accessibility', () => {
  it('has no axe violations on a middle page', async () => {
    const { container } = render(
      <main>
        <UnifiedPagination
          page={2}
          pageSize={25}
          total={120}
          onPageChange={vi.fn()}
          onPageSizeChange={vi.fn()}
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations when navigation is disabled on a single page', async () => {
    const { container } = render(
      <main>
        <UnifiedPagination
          page={1}
          pageSize={25}
          total={0}
          onPageChange={vi.fn()}
          onPageSizeChange={vi.fn()}
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
