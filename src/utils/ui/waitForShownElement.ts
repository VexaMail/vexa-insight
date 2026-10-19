import { SHOWN_ELEMENT_MAX_FRAMES } from '@/constants/ui'
import { nextAnimationFrame } from './nextAnimationFrame'

/**
 * The element with this id once it is laid out (its panel no longer hidden),
 * checked once per animation frame; null if it never shows.
 */
export async function waitForShownElement(
  id: string,
): Promise<HTMLElement | null> {
  for (let frame = 0; frame < SHOWN_ELEMENT_MAX_FRAMES; frame += 1) {
    await nextAnimationFrame()
    const element = document.getElementById(id)
    if (element && element.offsetParent !== null) return element
  }
  return null
}
