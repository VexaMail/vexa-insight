import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('getGeoip without a database', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('answers null lookups instead of throwing when the .dat files are missing', async () => {
    vi.stubEnv('GEODATADIR', mkdtempSync(join(tmpdir(), 'vexa-geoip-empty-')))
    const { getGeoip } = await import('../src/services/geoip/getGeoip')

    const geoip = await getGeoip()

    expect(geoip.lookup('192.0.2.10')).toBeNull()
  })
})
