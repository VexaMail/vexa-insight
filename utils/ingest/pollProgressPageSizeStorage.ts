import { DEFAULT_SIZE } from './defaultSize'
import { STORAGE_KEY } from './storageKey'
import { VALID_SIZES } from './validSizes'

export const pollProgressPageSizeStorage = {
  get defaultSize(): number {
    return DEFAULT_SIZE
  },
  get(): number {
    if (typeof window === 'undefined') return DEFAULT_SIZE
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const n = parseInt(stored ?? '', 10)
      return VALID_SIZES.includes(n as (typeof VALID_SIZES)[number])
        ? n
        : DEFAULT_SIZE
    } catch {
      return DEFAULT_SIZE
    }
  },
  set(pageSize: number): void {
    try {
      localStorage.setItem(STORAGE_KEY, String(pageSize))
    } catch {
      // ignore
    }
  },
}
