import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../services/updates/upsertUpdateState', () => ({
  upsertUpdateState: vi.fn(),
}))
vi.mock('../services/updates/getUpdateStateRow', () => ({
  getUpdateStateRow: vi.fn(() => undefined),
}))
vi.mock('../services/updates/fetchLatestRelease', () => ({
  fetchLatestRelease: vi.fn(),
}))

describe('checkForUpdates with no published release', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.VEXA_UPDATE_CHECK_ENABLED = 'true'
    process.env.VEXA_UPDATE_REPO = 'example/example'
  })

  it('reports a successful check that was skipped, not a failure', async () => {
    const { checkForUpdates } =
      await import('../services/updates/checkForUpdates')
    const { NoPublishedReleaseError } =
      await import('../services/updates/NoPublishedReleaseError')
    const { fetchLatestRelease } =
      await import('../services/updates/fetchLatestRelease')
    vi.mocked(fetchLatestRelease).mockRejectedValueOnce(
      new NoPublishedReleaseError(),
    )

    expect(await checkForUpdates()).toEqual({
      ok: true,
      skipped: 'no-releases',
    })
  })

  it('clears any stored error instead of persisting one', async () => {
    const { checkForUpdates } =
      await import('../services/updates/checkForUpdates')
    const { NoPublishedReleaseError } =
      await import('../services/updates/NoPublishedReleaseError')
    const { fetchLatestRelease } =
      await import('../services/updates/fetchLatestRelease')
    const { upsertUpdateState } =
      await import('../services/updates/upsertUpdateState')
    vi.mocked(fetchLatestRelease).mockRejectedValueOnce(
      new NoPublishedReleaseError(),
    )

    await checkForUpdates()

    expect(upsertUpdateState).toHaveBeenCalledTimes(1)
    const written = vi.mocked(upsertUpdateState).mock.calls[0]?.[0]
    expect(written).toMatchObject({ lastError: null, lastErrorAt: null })
    expect(written?.lastCheckedAt).toBeInstanceOf(Date)
  })

  it('still records a real failure as an error', async () => {
    const { checkForUpdates } =
      await import('../services/updates/checkForUpdates')
    const { fetchLatestRelease } =
      await import('../services/updates/fetchLatestRelease')
    const { upsertUpdateState } =
      await import('../services/updates/upsertUpdateState')
    vi.mocked(fetchLatestRelease).mockRejectedValueOnce(
      new Error('network down'),
    )

    expect(await checkForUpdates()).toEqual({
      ok: false,
      error: 'network down',
    })
    expect(vi.mocked(upsertUpdateState).mock.calls[0]?.[0]).toMatchObject({
      lastError: 'network down',
    })
  })
})
