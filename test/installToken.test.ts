import { afterEach, describe, expect, it } from 'vitest'
import { clearInstallToken } from '../services/install/clearInstallToken'
import { generateInstallToken } from '../services/install/generateInstallToken'
import { getInstallToken } from '../services/install/getInstallToken'
import { setInstallTokenForBoot } from '../services/install/setInstallTokenForBoot'

describe('installToken store', () => {
  afterEach(() => clearInstallToken())

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
