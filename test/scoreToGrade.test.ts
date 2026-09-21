import { describe, expect, it } from 'vitest'
import { scoreToGrade } from '../src/services/diagnostics/scoreToGrade'

describe('scoreToGrade', () => {
  it.each([
    [100, 'A'],
    [90, 'A'],
    [89, 'B'],
    [75, 'B'],
    [74, 'C'],
    [60, 'C'],
    [59, 'D'],
    [40, 'D'],
    [39, 'F'],
    [0, 'F'],
  ] as const)('grades %i as %s', (score, grade) => {
    expect(scoreToGrade(score)).toBe(grade)
  })
})
