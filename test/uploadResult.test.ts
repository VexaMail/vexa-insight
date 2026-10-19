import { newRecentUpload } from '@/utils/upload'
import { describe, expect, it } from 'vitest'
import { uploadedReportId } from '../src/utils/upload/uploadedReportId'
import { uploadSuccessMessage } from '../src/utils/upload/uploadSuccessMessage'

describe('upload result', () => {
  const accepted = {
    data: { reportId: 42, domain: 'example.com', processedRecords: 1 },
  }

  it('names the domain and the record count, singular when one', () => {
    expect(uploadSuccessMessage(accepted)).toBe('example.com: 1 record parsed')
  })

  it('keeps the stored report id so the result can link to it', () => {
    expect(uploadedReportId(accepted)).toBe(42)
    expect(uploadedReportId({ error: { message: 'Invalid XML' } })).toBeNull()
  })

  it('stamps the finish time instead of a fixed "just now"', () => {
    const entry = newRecentUpload(
      'report.xml.gz',
      { status: 'success', message: 'ok', reportId: 42 },
      new Date(2026, 9, 19, 4, 5, 6),
    )
    expect(entry).toMatchObject({ reportId: 42, time: '04:05:06' })
  })
})
