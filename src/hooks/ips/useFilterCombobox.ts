import { useState } from 'react'

export function useFilterCombobox() {
  const [open, setOpen] = useState(false)

  return { open, setOpen }
}
