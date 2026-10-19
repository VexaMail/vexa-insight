import { mergePendingFiles, summarizeUploadBatch } from '@/utils/upload'
import { describe, expect, it } from 'vitest'

describe('upload batch', () => {
  const a = new File(['<feedback/>'], 'a.xml')
  const b = new File(['<feedback></feedback>'], 'b.xml')

  it('adds chosen and dropped files to one list without duplicates', () => {
    const pending = mergePendingFiles([a], [a, b])
    expect(pending.map((file) => file.name)).toEqual(['a.xml', 'b.xml'])
  })

  it('keeps the message of a single upload', () => {
    expect(
      summarizeUploadBatch([
        { status: 'error', message: 'Invalid XML', reportId: null },
      ]),
    ).toEqual({ status: 'error', message: 'Invalid XML' })
  })

  it('counts the accepted files of a batch and flags a failure', () => {
    const summary = summarizeUploadBatch([
      { status: 'success', message: 'ok', reportId: 1 },
      { status: 'error', message: 'Invalid XML', reportId: null },
    ])
    expect(summary.status).toBe('error')
    expect(summary.message).toContain('1 of 2 files uploaded')
  })
})
