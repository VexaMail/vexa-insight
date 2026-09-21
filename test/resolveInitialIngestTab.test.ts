import { describe, expect, it } from 'vitest'
import { resolveInitialIngestTab } from '../src/utils/ingest/resolveInitialIngestTab'

describe('resolveInitialIngestTab', () => {
  it('opens poll results while a run is in progress', () => {
    expect(resolveInitialIngestTab(true, 0)).toBe('pollResults')
  })

  it('opens poll results when progress rows are still available', () => {
    expect(resolveInitialIngestTab(false, 12)).toBe('pollResults')
  })

  it('falls back to the run history when there is nothing live to show', () => {
    expect(resolveInitialIngestTab(false, 0)).toBe('jobRuns')
  })
})
