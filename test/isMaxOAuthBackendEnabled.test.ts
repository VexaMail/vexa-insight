import { isMaxOAuthBackendEnabled } from '@/services/ai'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('isMaxOAuthBackendEnabled', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('is on only with the flag set in development', () => {
    vi.stubEnv('LLM_BACKEND', 'max-oauth')
    vi.stubEnv('NODE_ENV', 'development')
    expect(isMaxOAuthBackendEnabled()).toBe(true)
  })

  // The production case is the whole point of the guard: a deployed runtime
  // must never authenticate with a developer's subscription token, however the
  // flag got into its environment.
  it.each([
    { backend: '', nodeEnv: 'development', why: 'no flag' },
    { backend: 'max-oauth', nodeEnv: 'production', why: 'production' },
    { backend: 'max-oauth', nodeEnv: 'staging', why: 'a non-development env' },
  ])('is off with $why', ({ backend, nodeEnv }) => {
    vi.stubEnv('LLM_BACKEND', backend)
    vi.stubEnv('NODE_ENV', nodeEnv)
    expect(isMaxOAuthBackendEnabled()).toBe(false)
  })
})
