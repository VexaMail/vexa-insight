import type { MouseEvent } from 'react'

/** A primary-button click with no modifier, which a link follows in place. */
export function isPlainLeftClick(
  event: MouseEvent | globalThis.MouseEvent,
): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}
