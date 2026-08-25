import { useState } from 'react'

/**
 * Open/close state for the full rescan confirmation dialog, with a confirm
 * handler that closes the dialog before starting the run.
 */
export function useFullRescanDialog(onConfirm: () => void) {
  const [open, setOpen] = useState(false)

  function confirm() {
    setOpen(false)
    onConfirm()
  }

  function close() {
    setOpen(false)
  }

  return { open, setOpen, confirm, close }
}
