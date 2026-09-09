import type { UseFilterComboboxReturn } from '@/types/ips'
import { useState } from 'react'

export function useFilterCombobox(
  onChange: (value: string) => void,
): UseFilterComboboxReturn {
  const [open, setOpen] = useState(false)

  const select = (value: string) => {
    onChange(value)
    setOpen(false)
  }

  return { open, setOpen, select }
}
