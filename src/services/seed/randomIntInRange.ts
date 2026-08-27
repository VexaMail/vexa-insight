import crypto from 'node:crypto'

export function randomIntInRange(min: number, max: number): number {
  return crypto.randomInt(min, max + 1)
}
