import crypto from 'node:crypto'
import { RANDOM_CHANCE_RANGE } from './randomChanceRange'

export function randomChance(threshold: number): boolean {
  return (
    crypto.randomInt(0, RANDOM_CHANCE_RANGE) < threshold * RANDOM_CHANCE_RANGE
  )
}
