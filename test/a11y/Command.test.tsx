import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('Command palette accessibility', () => {
  const renderCommand = (items: string[]) =>
    render(
      <main>
        <h1>Domains</h1>
        <Command label="Domain search">
          <CommandInput placeholder="Search domains..." />
          <CommandList>
            <CommandEmpty>No domains found.</CommandEmpty>
            <CommandGroup heading="Domains">
              {items.map((item) => (
                <CommandItem key={item} value={item}>
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </main>,
    )

  it('has no axe violations with results listed', async () => {
    const { container } = renderCommand(['example.com', 'example.net'])

    expect(screen.getByRole('combobox')).toBeVisible()
    expect(screen.getAllByRole('option')).toHaveLength(2)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  // Characterization, not an endorsement: cmdk puts `role="listbox"` on
  // CommandList unconditionally, so with no results the listbox has no `option`
  // children and axe raises `aria-required-children` (wcag2a). The fix belongs
  // in the shared `CommandList` primitive and is tracked in the backlog; this test
  // pins the exact scope of the known issue so any *other* regression in the
  // empty state still fails loudly, and so it fails when the issue is fixed.
  it('has only the known cmdk empty-listbox violation in the empty state', async () => {
    const { container } = renderCommand([])

    const results = await axe(container)

    expect(results.violations.map((v) => v.id)).toEqual([
      'aria-required-children',
    ])
  })
})
