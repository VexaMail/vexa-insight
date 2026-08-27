import crypto from 'node:crypto'

/**
 * Constant-time string compare. Returns false on length mismatch (without
 * leaking timing for the length, since Buffer.from is O(n) anyway).
 */
export function timingSafeStringEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}
