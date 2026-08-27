import { describe, expect, it } from 'vitest'
import { rowToConfig } from '../src/lib/config/rowToConfig'
import type { SettingsRow } from '../src/lib/config/SettingsRow'
import { DEFAULT_DAYS_BACK } from '../src/utils/install/defaultDaysBack'

describe('rowToConfig ingestion window', () => {
  const baseRow: SettingsRow = {
    apiV1Str: '/api/v1',
    ingestionIntervalMinutes: 60,
    ingestionDaysBack: 30,
    ingestionIncludeTrash: false,
    ingestionIncludeAllFolders: false,
    secretKey: 'x'.repeat(32),
    backendCorsOrigins: '',
    environment: 'production',
    ipHostnameLookupEnabled: false,
    ipHostnameRefreshIntervalHours: 24,
    ipHostnameTimeoutMs: 3000,
    ipHostnameMaxRetries: 2,
    ipHostnameRetryBackoffMinutes: 30,
    ipHostnameBatchSize: 100,
    ipHostnameManualRefreshEnabled: true,
    ipHostnameAllowPrivateIps: false,
    ipHostnameNegativeCacheHours: 24,
  }

  const configFor = (ingestionDaysBack: number) =>
    rowToConfig({ ...baseRow, ingestionDaysBack }, 'file:./data/vexa.db', [])

  it('keeps a configured window', () => {
    expect(configFor(7).ingestionDaysBack).toBe(7)
  })

  // A stored 0 used to mean "no limit", which made every scheduled run walk
  // the whole mailbox. Migration 0030 rewrites it, but a restored database or
  // a hand-edited row must not reintroduce the unbounded scan.
  it('floors a stored 0 to the default window', () => {
    expect(configFor(0).ingestionDaysBack).toBe(DEFAULT_DAYS_BACK)
  })

  it('floors an out-of-range value to the default window', () => {
    expect(configFor(-1).ingestionDaysBack).toBe(DEFAULT_DAYS_BACK)
    expect(configFor(9999).ingestionDaysBack).toBe(DEFAULT_DAYS_BACK)
  })
})
