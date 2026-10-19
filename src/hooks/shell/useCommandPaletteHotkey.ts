'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'

/** Toggles the command palette on Cmd+K / Ctrl+K from anywhere in the app. */
export function useCommandPaletteHotkey(
  setOpen: Dispatch<SetStateAction<boolean>>,
): void {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [setOpen])
}
