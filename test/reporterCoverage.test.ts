import { summarizeReporterCoverage } from '@/utils/gaps'
import { describe, expect, it } from 'vitest'

const DAY = 86_400
const NOW = 100 * DAY

describe('summarizeReporterCoverage', () => {
  it('flags a daily reporter that stopped, not a sporadic one', () => {
    const daily = Array.from({ length: 20 }, (_, i) => ({
      orgName: 'receiver-a',
      endDate: NOW - (10 + i) * DAY,
    }))
    const sporadic = [
      { orgName: 'receiver-b', endDate: NOW - 12 * DAY },
      { orgName: 'receiver-b', endDate: NOW - 45 * DAY },
    ]
    const fresh = [{ orgName: 'receiver-c', endDate: NOW - DAY }]

    const coverage = summarizeReporterCoverage(
      [...daily, ...sporadic, ...fresh],
      NOW,
    )

    expect(
      coverage.map(({ orgName, daysSilent, silent, recentReportCount }) => ({
        orgName,
        daysSilent,
        silent,
        recentReportCount,
      })),
    ).toEqual([
      {
        orgName: 'receiver-c',
        daysSilent: 1,
        silent: false,
        recentReportCount: 1,
      },
      {
        orgName: 'receiver-a',
        daysSilent: 10,
        silent: true,
        recentReportCount: 20,
      },
      {
        orgName: 'receiver-b',
        daysSilent: 12,
        silent: false,
        recentReportCount: 1,
      },
    ])
  })
})
