import crypto from 'node:crypto'

export function pickRandom<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('pickRandom called on empty array')
  }
  const index = crypto.randomInt(0, items.length)
  const value = items[index]
  if (value === undefined) {
    throw new Error('pickRandom got undefined slot — should never happen')
  }
  return value
}
