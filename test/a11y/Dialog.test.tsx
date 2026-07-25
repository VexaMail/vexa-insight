import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('Dialog accessibility', () => {
  const renderDialog = (open: boolean) =>
    render(
      <main>
        <h1>Domains</h1>
        <Dialog defaultOpen={open}>
          <DialogTrigger>Delete domain</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete example.com?</DialogTitle>
              <DialogDescription>
                This removes the domain and every report ingested for it.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button type="button">Cancel</button>
              <button type="button">Delete</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>,
    )

  it('has no axe violations while closed', async () => {
    const { container } = renderDialog(false)

    expect(screen.getByRole('button', { name: 'Delete domain' })).toBeVisible()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations while open, with a named and described dialog', async () => {
    renderDialog(true)

    const dialog = await screen.findByRole('dialog', {
      name: 'Delete example.com?',
    })
    expect(dialog).toHaveAccessibleDescription(
      'This removes the domain and every report ingested for it.',
    )

    // Portalled to <body>; see Select.test.tsx for why `region` is off here.
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    })
    expect(results.violations).toEqual([])
  })
})
