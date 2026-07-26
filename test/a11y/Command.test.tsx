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

  // cmdk puts `role="listbox"` on CommandList unconditionally, so an empty
  // state whose message is only `role="presentation"` leaves the listbox with
  // no `option` child and trips axe's `aria-required-children` (wcag2a).
  // `CommandEmpty` exposes the message as a disabled option instead. Removing
  // the listbox is not an option: the input's `aria-controls` would dangle,
  // which axe reports as `aria-valid-attr-value`.
  it('has no axe violations in the empty state', async () => {
    const { container } = renderCommand([])

    expect(screen.getByText('No domains found.')).toBeVisible()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('exposes the empty message as a disabled option of the listbox', () => {
    renderCommand([])

    const listbox = screen.getByRole('listbox')
    const emptyOption = screen.getByRole('option', {
      name: 'No domains found.',
    })

    expect(listbox).toContainElement(emptyOption)
    expect(emptyOption).toHaveAttribute('aria-disabled', 'true')
    expect(emptyOption).toHaveAttribute('aria-selected', 'false')
  })

  it('drops the empty message once results come back', () => {
    renderCommand(['example.com'])

    expect(screen.queryByText('No domains found.')).toBeNull()
    expect(screen.getAllByRole('option')).toHaveLength(1)
  })
})
