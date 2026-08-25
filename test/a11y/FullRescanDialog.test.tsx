import { FullRescanDialog } from '@/components/ingest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

describe('FullRescanDialog accessibility', () => {
  const renderDialog = (onConfirm = vi.fn()) => {
    const view = render(
      <main>
        <h1>Ingestion</h1>
        <FullRescanDialog onConfirm={onConfirm} />
      </main>,
    )
    return { ...view, onConfirm }
  }

  it('has no axe violations while closed', async () => {
    const { container } = renderDialog()

    expect(screen.getByRole('button', { name: 'Full rescan' })).toBeVisible()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('warns before starting and only confirms on the explicit action', async () => {
    const { onConfirm } = renderDialog()

    fireEvent.click(screen.getByRole('button', { name: 'Full rescan' }))

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Rescan the whole mailbox?' }),
      ).toBeVisible()
    })
    expect(onConfirm).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Start full rescan' }))

    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('closes without starting anything on cancel', async () => {
    const { onConfirm } = renderDialog()

    fireEvent.click(screen.getByRole('button', { name: 'Full rescan' }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeVisible()
    })
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: 'Rescan the whole mailbox?' }),
      ).not.toBeInTheDocument()
    })
    expect(onConfirm).not.toHaveBeenCalled()
  })
})
