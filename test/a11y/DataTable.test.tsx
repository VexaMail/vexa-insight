import { DataTable } from '@/components/ui'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('DataTable accessibility', () => {
  const columns = [
    { accessorKey: 'ip', header: 'Source IP' },
    { accessorKey: 'messages', header: 'Messages' },
  ]

  const rows = [
    { ip: '203.0.113.10', messages: 120 },
    { ip: '198.51.100.20', messages: 45 },
  ]

  it('has no axe violations with toolbar, header, and pagination', async () => {
    const { container } = render(
      <main>
        <h1>Sources</h1>
        <DataTable columns={columns} data={rows} />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations when empty', async () => {
    const { container } = render(
      <main>
        <h1>Sources</h1>
        <DataTable columns={columns} data={[]} />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations with the toolbar and pagination hidden', async () => {
    const { container } = render(
      <main>
        <h1>Sources</h1>
        <DataTable columns={columns} data={rows} hideToolbar hidePagination />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
