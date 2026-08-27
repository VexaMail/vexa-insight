import { describe, expect, it } from 'vitest'
import { imapTestRequestSchema } from '../src/validators/imap'

describe('imapTestRequestSchema', () => {
  const credentials = () => ({
    server: 'imap.example.com',
    username: 'user',
    password: 'secret',
  })

  it('accepts a stored account reference', () => {
    const parsed = imapTestRequestSchema.safeParse({ accountId: 7 })
    expect(parsed.success).toBe(true)
    expect(parsed.data).toEqual({ accountId: 7 })
  })

  it('prefers the account id over inline credentials', () => {
    const parsed = imapTestRequestSchema.safeParse({
      accountId: 2,
      ...credentials(),
    })
    expect(parsed.data).toEqual({ accountId: 2 })
  })

  it('accepts nested inline credentials and applies defaults', () => {
    const parsed = imapTestRequestSchema.safeParse({
      account: credentials(),
    })
    expect(parsed.data).toEqual({
      account: {
        id: 0,
        server: 'imap.example.com',
        port: 993,
        username: 'user',
        password: 'secret',
        fetchIncludeTrash: false,
        fetchIncludeAllFolders: false,
        postProcessAction: 'none',
        postProcessFolder: null,
        moveToTrashAfterProcess: false,
        markAsReadAfterProcess: false,
      },
    })
  })

  it('accepts top-level inline credentials', () => {
    const parsed = imapTestRequestSchema.safeParse({
      ...credentials(),
      port: 143,
    })
    expect(parsed.success).toBe(true)
    expect(parsed.data).toMatchObject({ account: { port: 143 } })
  })

  it('parses a string port and falls back for unusable ports', () => {
    expect(
      imapTestRequestSchema.safeParse({ ...credentials(), port: '2143' }).data,
    ).toMatchObject({ account: { port: 2143 } })
    expect(
      imapTestRequestSchema.safeParse({ ...credentials(), port: 'nope' }).data,
    ).toMatchObject({ account: { port: 993 } })
    expect(
      imapTestRequestSchema.safeParse({ ...credentials(), port: 70000 }).data,
    ).toMatchObject({ account: { port: 993 } })
  })

  it('falls back to inline credentials when the account id is unusable', () => {
    const parsed = imapTestRequestSchema.safeParse({
      accountId: 0,
      ...credentials(),
    })
    expect(parsed.data).toMatchObject({
      account: { server: 'imap.example.com' },
    })
  })

  it('rejects an empty body, arrays and non-objects', () => {
    expect(imapTestRequestSchema.safeParse({}).success).toBe(false)
    expect(imapTestRequestSchema.safeParse([]).success).toBe(false)
    expect(imapTestRequestSchema.safeParse(null).success).toBe(false)
    expect(imapTestRequestSchema.safeParse('imap').success).toBe(false)
  })

  it('rejects incomplete or empty credentials', () => {
    expect(
      imapTestRequestSchema.safeParse({ server: 'imap.example.com' }).success,
    ).toBe(false)
    expect(
      imapTestRequestSchema.safeParse({ ...credentials(), password: '' })
        .success,
    ).toBe(false)
    expect(
      imapTestRequestSchema.safeParse({ ...credentials(), username: 5 })
        .success,
    ).toBe(false)
  })

  it('rejects a non-positive or non-numeric account id without credentials', () => {
    expect(imapTestRequestSchema.safeParse({ accountId: -1 }).success).toBe(
      false,
    )
    expect(imapTestRequestSchema.safeParse({ accountId: '3' }).success).toBe(
      false,
    )
  })
})
