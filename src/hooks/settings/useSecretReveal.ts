'use client'

import type { UseSecretRevealReturn } from '@/types/settings'
import { useState } from 'react'

/** Show/hide state of a secret displayed on the settings page. */
export function useSecretReveal(): UseSecretRevealReturn {
  const [isRevealed, setIsRevealed] = useState(false)
  return {
    isRevealed,
    handleToggleReveal: () => {
      setIsRevealed((value) => !value)
    },
  }
}
