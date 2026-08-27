import { isNumber } from './isNumber'

export function parsePort(v: unknown): number | null {
  if (isNumber(v) && v >= 1 && v <= 65535) return v
  if (typeof v === 'string') {
    const n = parseInt(v, 10)
    if (Number.isFinite(n) && n >= 1 && n <= 65535) return n
  }
  return null
}
