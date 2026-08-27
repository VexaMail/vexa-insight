import { describe, expect, it } from 'vitest'
import { selfUpdateApplySchema } from '../src/validators/updates'

describe('selfUpdateApplySchema', () => {
  it('accepts a semver tag ref', () => {
    const parsed = selfUpdateApplySchema.safeParse({ ref: 'v1.2.3' })
    expect(parsed.success).toBe(true)
    expect(parsed.data).toEqual({ ref: 'v1.2.3' })
  })

  it('accepts a pre-release tag ref', () => {
    expect(
      selfUpdateApplySchema.safeParse({ ref: 'v1.2.3-beta.1' }).success,
    ).toBe(true)
  })

  it('treats a missing, null or non-object body as "no ref"', () => {
    for (const body of [null, undefined, {}, { ref: null }, 'latest', 42, []]) {
      const parsed = selfUpdateApplySchema.safeParse(body)
      expect(parsed.success).toBe(true)
      expect(parsed.data?.ref ?? null).toBeNull()
    }
  })

  it('rejects refs that are not semver tags', () => {
    for (const ref of ['main', '1.2.3', 'v1.2', 'v1.2.3; rm -rf /', '']) {
      const parsed = selfUpdateApplySchema.safeParse({ ref })
      expect(parsed.success).toBe(false)
      expect(parsed.error?.issues[0]?.message).toBe(
        'ref must match vMAJOR.MINOR.PATCH',
      )
    }
  })

  it('rejects a non-string ref with the same message', () => {
    const parsed = selfUpdateApplySchema.safeParse({ ref: 5 })
    expect(parsed.success).toBe(false)
    expect(parsed.error?.issues[0]?.message).toBe(
      'ref must match vMAJOR.MINOR.PATCH',
    )
  })
})
