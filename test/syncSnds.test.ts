import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/notifications', () => ({
  fireAndForgetDispatch: vi.fn(),
}))

/**
 * SNDS answers 404 for a day it has no data for, which is the normal state
 * for a new or quiet IP. The sync must record that as "no data", keep the
 * connection usable, and store the refresh token Microsoft rotates on every
 * use.
 */
describe('syncSnds', () => {
  const KEY = 'this-is-a-32-character-test-key-AA'
  const NOW = new Date('2026-10-02T08:00:00Z')

  const tokenResponse = (refresh: string) =>
    new Response(
      JSON.stringify({ access_token: 'access', refresh_token: refresh }),
      { status: 200 },
    )

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { getDb, sndsConnection, sndsIpData, sndsIpStatus } =
      await import('@/lib/db')
    const { encryptSecret } = await import('@/services/crypto')
    const db = getDb()
    db.delete(sndsIpData).run()
    db.delete(sndsIpStatus).run()
    db.delete(sndsConnection).run()
    db.insert(sndsConnection)
      .values({
        id: 1,
        refreshTokenEncrypted: encryptSecret('refresh-0', KEY),
        updatedAt: NOW,
      })
      .run()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const storedRefreshToken = async () => {
    const { getSndsConnectionRow } = await import('@/services/snds')
    const { decryptSecret } = await import('@/services/crypto')
    return decryptSecret(
      getSndsConnectionRow()?.refreshTokenEncrypted ?? '',
      KEY,
    )
  }

  it('treats 404 as no data rather than an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        Promise.resolve(
          url.includes('/token')
            ? tokenResponse('refresh-1')
            : new Response('', { status: 404 }),
        ),
      ),
    )
    const { getSndsConnectionRow, syncSnds } = await import('@/services/snds')

    const result = await syncSnds(KEY, NOW)

    expect(result).toEqual({
      status: 'no-data',
      daysFetched: 0,
      rowsStored: 0,
      statusRows: 0,
      error: null,
    })
    const row = getSndsConnectionRow()
    expect(row?.lastSyncStatus).toBe('no-data')
    expect(row?.lastSyncError).toBeNull()
  })

  it('stores data rows and the status list, and keeps the rotated refresh token', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (url.includes('/token'))
          return Promise.resolve(tokenResponse('refresh-2'))
        if (url.endsWith('report/status/ip')) {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { firstIp: '192.0.2.1', lastIp: '192.0.2.1', blocked: 'No' },
              ]),
            ),
          )
        }
        if (url.endsWith('report/data/2026-10-01')) {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                {
                  ipAddress: '192.0.2.1',
                  filterResult: 'GREEN',
                  messageRecipients: 40,
                },
              ]),
            ),
          )
        }
        return Promise.resolve(new Response('', { status: 404 }))
      }),
    )
    const { listSndsLatestByIp, syncSnds } = await import('@/services/snds')

    const result = await syncSnds(KEY, NOW)

    expect(result).toMatchObject({
      status: 'ok',
      daysFetched: 1,
      rowsStored: 1,
      statusRows: 1,
    })
    expect(await storedRefreshToken()).toBe('refresh-2')
    expect(listSndsLatestByIp()).toEqual([
      expect.objectContaining({
        ip: '192.0.2.1',
        reportDate: '2026-10-01',
        filterResult: 'GREEN',
      }),
    ])
  })

  it('records an error and keeps the stored token when Microsoft refuses the refresh', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Promise.resolve(
          new Response(JSON.stringify({ error: 'invalid_grant' }), {
            status: 400,
          }),
        ),
      ),
    )
    const { getSndsConnectionRow, syncSnds } = await import('@/services/snds')

    const result = await syncSnds(KEY, NOW)

    expect(result.status).toBe('error')
    expect(getSndsConnectionRow()?.lastSyncError).toContain('invalid_grant')
    expect(await storedRefreshToken()).toBe('refresh-0')
  })
})
