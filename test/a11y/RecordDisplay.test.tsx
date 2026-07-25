import { RecordDisplay } from '@/components/diagnostics'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('RecordDisplay accessibility', () => {
  it('has no axe violations when a record is present', async () => {
    const { container } = render(
      <main>
        <RecordDisplay
          label="SPF"
          record="v=spf1 include:_spf.example.net -all"
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in the empty state', async () => {
    const { container } = render(
      <main>
        <RecordDisplay label="BIMI" record={null} />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
