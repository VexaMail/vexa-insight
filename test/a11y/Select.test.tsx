import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('Select accessibility', () => {
  const renderSelect = (open: boolean) =>
    render(
      <main>
        <h1>Filters</h1>
        <Select defaultOpen={open}>
          <SelectTrigger aria-label="Disposition">
            <SelectValue placeholder="All dispositions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="quarantine">Quarantine</SelectItem>
            <SelectItem value="reject">Reject</SelectItem>
          </SelectContent>
        </Select>
      </main>,
    )

  it('has no axe violations while closed', async () => {
    const { container } = renderSelect(false)

    expect(screen.getByRole('combobox', { name: 'Disposition' })).toBeVisible()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations with the listbox open', async () => {
    renderSelect(true)

    // Radix portals the content outside `container`, so audit the whole
    // document — auditing the container alone would silently skip the popover
    // and the trigger/listbox wiring between them.
    const listbox = await screen.findByRole('listbox')
    expect(listbox).toBeVisible()
    expect(screen.getAllByRole('option')).toHaveLength(3)

    const results = await axe(document.body, {
      // `region` flags any content outside a landmark. The portal mounts as a
      // direct child of <body> by design, so this fires on the popover in every
      // correct implementation; it says nothing about the popover itself.
      rules: { region: { enabled: false } },
    })
    expect(results.violations).toEqual([])
  })
})
