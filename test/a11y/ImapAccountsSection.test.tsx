import { ImapAccountsSection } from '@/components/settings'
import type { ImapAccountFormEntry } from '@/types/settings'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

describe('ImapAccountsSection accessibility', () => {
  const account = (
    overrides: Partial<ImapAccountFormEntry> = {},
  ): ImapAccountFormEntry => ({
    id: 1,
    label: 'Primary Inbox',
    server: 'imap.example.com',
    port: 993,
    username: 'user@example.com',
    passwordMasked: true,
    fetchIncludeTrash: false,
    fetchIncludeAllFolders: false,
    postProcessAction: 'none',
    postProcessFolder: null,
    moveToTrashAfterProcess: false,
    markAsReadAfterProcess: true,
    ...overrides,
  })

  const renderSection = (accounts: ImapAccountFormEntry[]) =>
    render(
      <main>
        <h1>Settings</h1>
        <ImapAccountsSection
          accounts={accounts}
          apiKey="secret-key"
          onUpdate={vi.fn()}
          onAdd={vi.fn()}
          onRemove={vi.fn()}
          onTestConnection={vi.fn()}
        />
      </main>,
    )

  // `useImapAccountsSection` expands entries whose id is 0, so an unsaved
  // account is the only way to render the form without simulating a click.
  const unsaved = account({ id: 0, label: '', passwordMasked: false })

  it('has no axe violations with every account collapsed', async () => {
    const { container } = renderSection([account()])

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations with the account form expanded', async () => {
    const { container } = renderSection([unsaved])

    expect(screen.getByPlaceholderText('imap.example.com')).toBeInTheDocument()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  // The section is a framer-motion element that starts at `opacity: 0`, and
  // jsdom never advances the animation, so `toBeVisible` would fail on every
  // node here for a reason unrelated to accessibility. Resolving each control
  // by role *and* accessible name is the assertion that matters.
  it('labels every field of the expanded form', () => {
    renderSection([unsaved])

    expect(
      screen.getByRole('textbox', { name: 'Account Label' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'IMAP Server' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: 'Port' })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Username' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Password / App Password')).toBeInTheDocument()
  })

  // Every field id is derived from the row index, so two expanded accounts
  // must not collide: a duplicate id would silently point both labels at the
  // first input.
  it('gives each expanded account its own field ids', () => {
    renderSection([
      account({ id: 0, label: '' }),
      account({ id: 0, label: '', username: 'second@example.com' }),
    ])

    const ids = screen
      .getAllByRole('textbox', { name: 'Account Label' })
      .map((input) => input.id)

    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
  })

  it('exposes the collapsed header as a single expandable control', () => {
    renderSection([account()])

    const header = screen.getByRole('button', { name: /Primary Inbox/ })

    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(header.tagName).toBe('BUTTON')
    expect(header.querySelector('button')).toBeNull()
  })

  // `FolderPicker` only renders for a saved account set to move processed
  // mail, so the row has to be expanded by hand. Its `select` carries no
  // visible label, which is why this case is audited separately.
  it('has no axe violations with the folder picker showing', async () => {
    const { container } = renderSection([
      account({ postProcessAction: 'move_to_folder' }),
    ])

    fireEvent.click(screen.getByRole('button', { name: /Primary Inbox/ }))

    expect(
      screen.getByRole('combobox', { name: 'Destination folder' }),
    ).toBeInTheDocument()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
