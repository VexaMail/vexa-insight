import { settingsUpdateSchema } from '@/utils/validation'
import { describe, expect, it } from 'vitest'

describe('settingsUpdateSchema project name', () => {
  it('trims a configured project name', () => {
    expect(
      settingsUpdateSchema.parse({ projectName: '  Mail Watch  ' }),
    ).toEqual({ projectName: 'Mail Watch' })
  })

  it('rejects blank and overlong project names', () => {
    expect(settingsUpdateSchema.safeParse({ projectName: '   ' }).success).toBe(
      false,
    )
    expect(
      settingsUpdateSchema.safeParse({ projectName: 'x'.repeat(81) }).success,
    ).toBe(false)
  })
})
