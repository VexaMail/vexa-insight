'use client'

import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

/** Moves keyboard focus to the day button whenever the picker marks it focused. */
export function useCalendarDayButton(
  isFocused: boolean,
): RefObject<HTMLButtonElement | null> {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (isFocused) ref.current?.focus()
  }, [isFocused])
  return ref
}
