import { beforeEach, describe, expect, it, vi } from 'vitest'

const getPollStatus = vi.fn()
const getJobRunHistory = vi.fn()
const getIngestActivity = vi.fn()
const getProcessedMessages = vi.fn()

vi.mock('@/services/job', () => ({
  getPollStatus,
  getJobRunHistory,
  getIngestActivity,
}))

vi.mock('@/services/processed-messages', () => ({ getProcessedMessages }))

vi.mock('@/services/settings', () => ({
  getSettingsForAdmin: () => ({ ingestionIntervalMinutes: 60 }),
}))

describe('getIngestPageData', () => {
  const idleStatus = {
    isRunning: false,
    lastCheck: null,
    currentProcessed: 0,
    totalEmails: 0,
    processingEmails: 0,
    etaMs: 0,
    progressItems: { items: [], total: 0, page: 1, pageSize: 50 },
    activeJobRunId: null,
  }

  const lastRun = {
    id: 42,
    runAt: new Date('2026-01-15T10:00:00Z'),
    success: true,
    processed: 0,
    ingested: 0,
    errorCount: 0,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    getPollStatus.mockResolvedValue(idleStatus)
    getJobRunHistory.mockResolvedValue([lastRun])
    getIngestActivity.mockResolvedValue([])
    getProcessedMessages.mockResolvedValue([])
  })

  it('lists the latest emails across runs when no job is requested', async () => {
    const { getIngestPageData } = await import('@/services/ingest')

    const data = await getIngestPageData()

    expect(getProcessedMessages).toHaveBeenCalledWith(50, undefined)
    expect(data.isHistoricalJobContext).toBe(false)
    expect(data.selectedRun).toBeNull()
  })

  it('scopes the emails to the run the user asked for', async () => {
    const { getIngestPageData } = await import('@/services/ingest')

    const data = await getIngestPageData(42)

    expect(getProcessedMessages).toHaveBeenCalledWith(50, 42)
    expect(data.isHistoricalJobContext).toBe(true)
    expect(data.selectedRun?.id).toBe(42)
  })

  it('carries the daily activity used by the ingestion chart', async () => {
    getIngestActivity.mockResolvedValue([
      {
        date: '2026-01-15',
        successfulRuns: 2,
        failedRuns: 0,
        processed: 9,
        ingested: 7,
        errors: 0,
      },
    ])
    const { getIngestPageData } = await import('@/services/ingest')

    const data = await getIngestPageData()

    expect(getIngestActivity).toHaveBeenCalledWith(30)
    expect(data.activity[0]?.ingested).toBe(7)
  })
})
