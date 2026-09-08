import { afterEach, describe, expect, it, vi } from 'vitest'
import { clearInstallToken } from '../src/services/install/clearInstallToken'
import { generateInstallToken } from '../src/services/install/generateInstallToken'
import { getInstallToken } from '../src/services/install/getInstallToken'
import { setInstallTokenForBoot } from '../src/services/install/setInstallTokenForBoot'

describe('installToken store', () => {
  afterEach(() => {
    clearInstallToken()
  })

  it('generateInstallToken returns 48 hex chars', () => {
    expect(generateInstallToken()).toMatch(/^[0-9a-f]{48}$/)
  })

  it('set + get round-trip', () => {
    setInstallTokenForBoot('abc')
    expect(getInstallToken()).toBe('abc')
  })

  it('clear resets the store', () => {
    setInstallTokenForBoot('xyz')
    clearInstallToken()
    expect(getInstallToken()).toBeNull()
  })
})

describe('installToken store across module instances', () => {
  it('shares the token with a freshly loaded copy of the module', async () => {
    setInstallTokenForBoot('boot-token')
    vi.resetModules()
    const fresh = await import('../src/services/install/getInstallToken')
    expect(fresh.getInstallToken()).toBe('boot-token')
    clearInstallToken()
  })
})
