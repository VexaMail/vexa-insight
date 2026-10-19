import { describe, expect, it } from 'vitest'

import { nextMenuIndex } from '@/utils/ui'

describe('nextMenuIndex', () => {
  it('moves down and wraps past the last item', () => {
    expect(nextMenuIndex('ArrowDown', 0, 3)).toBe(1)
    expect(nextMenuIndex('ArrowDown', 2, 3)).toBe(0)
    expect(nextMenuIndex('ArrowDown', -1, 3)).toBe(0)
  })

  it('moves up and wraps past the first item', () => {
    expect(nextMenuIndex('ArrowUp', 1, 3)).toBe(0)
    expect(nextMenuIndex('ArrowUp', 0, 3)).toBe(2)
    expect(nextMenuIndex('ArrowUp', -1, 3)).toBe(2)
  })

  it('jumps to the ends with Home and End', () => {
    expect(nextMenuIndex('Home', 2, 3)).toBe(0)
    expect(nextMenuIndex('End', 0, 3)).toBe(2)
  })

  it('ignores other keys and empty menus', () => {
    expect(nextMenuIndex('a', 0, 3)).toBeNull()
    expect(nextMenuIndex('ArrowDown', -1, 0)).toBeNull()
  })
})
