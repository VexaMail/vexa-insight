import type { ParsedHash } from '@/types/auth'

export function parseStoredHash(stored: string): ParsedHash | null {
  if (stored.startsWith('scrypt$')) {
    const parts = stored.split('$')
    if (parts.length !== 6) return null
    const [, nStr, rStr, pStr, salt, hash] = parts
    const N = Number(nStr)
    const r = Number(rStr)
    const p = Number(pStr)
    if (!Number.isInteger(N) || !Number.isInteger(r) || !Number.isInteger(p)) {
      return null
    }
    if (!salt || !hash) return null
    return { salt, hash, opts: { N, r, p } }
  }
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return null
  return { salt, hash, opts: { N: 16_384, r: 8, p: 1 } }
}
