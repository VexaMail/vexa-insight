import { afterEach, describe, expect, it, vi } from 'vitest'

const getSessionMock = vi.fn()
vi.mock('../src/services/auth/getSession', () => ({
  getSession: () => getSessionMock() as unknown,
}))

const redirectMock = vi.fn((target: string) => {
  throw new Error(`REDIRECT:${target}`)
})
vi.mock('next/navigation', () => ({
  redirect: (target: string) => redirectMock(target),
}))

describe('requirePageSession', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to /login when the cookie does not map to a live session', async () => {
    getSessionMock.mockResolvedValue(null)
    const { requirePageSession } =
      await import('../src/services/auth/requirePageSession')

    await expect(requirePageSession()).rejects.toThrow('REDIRECT:/login')
    expect(redirectMock).toHaveBeenCalledWith('/login')
  })

  it('returns the session when it is valid', async () => {
    const session = { user: { id: 1, role: 'admin' }, session: { id: 's' } }
    getSessionMock.mockResolvedValue(session)
    const { requirePageSession } =
      await import('../src/services/auth/requirePageSession')

    await expect(requirePageSession()).resolves.toBe(session)
    expect(redirectMock).not.toHaveBeenCalled()
  })
})
