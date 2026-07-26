import {
  createUserInputSchema,
  updateUserInputSchema,
} from '@/validators/users'
import { describe, expect, it } from 'vitest'

/**
 * `allowedDomains` is the input side of `getAllowedDomainIds`, which treats an
 * empty list as deny-all. Storing one is therefore a way to create a user who
 * silently sees nothing, so the boundary rejects it instead.
 */
describe('user input schemas', () => {
  const base = { username: 'someone', password: 'hunter2hunter2' }

  it('accepts a non-empty allow-list', () => {
    expect(
      createUserInputSchema.safeParse({
        ...base,
        allowedDomains: ['example.com'],
      }).success,
    ).toBe(true)
    expect(
      updateUserInputSchema.safeParse({ allowedDomains: ['example.com'] })
        .success,
    ).toBe(true)
  })

  it('treats an omitted allow-list as unrestricted', () => {
    expect(createUserInputSchema.safeParse(base).success).toBe(true)
    expect(updateUserInputSchema.safeParse({ role: 'viewer' }).success).toBe(
      true,
    )
  })

  it('rejects an empty allow-list on create and update', () => {
    const created = createUserInputSchema.safeParse({
      ...base,
      allowedDomains: [],
    })
    const updated = updateUserInputSchema.safeParse({ allowedDomains: [] })

    expect(created.success).toBe(false)
    expect(updated.success).toBe(false)
    expect(updated.error?.issues[0]?.message).toContain('at least one')
  })
})
