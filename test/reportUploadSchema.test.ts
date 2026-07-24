import { describe, expect, it } from 'vitest'
import { reportUploadSchema } from '../app/api/v1/reports/upload/reportUploadSchema'

describe('reportUploadSchema', () => {
  const fileOf = (name: string, bytes = 8) =>
    new File([new Uint8Array(bytes)], name)

  it('accepts every allowed extension', () => {
    for (const name of [
      'report.xml',
      'report.gz',
      'report.gzip',
      'report.zip',
      'REPORT.XML',
    ]) {
      expect(reportUploadSchema.safeParse({ file: fileOf(name) }).success).toBe(
        true,
      )
    }
  })

  it('rejects a missing or non-file part', () => {
    for (const file of [null, undefined, 'report.xml']) {
      const parsed = reportUploadSchema.safeParse({ file })
      expect(parsed.success).toBe(false)
      expect(parsed.error?.issues[0]?.message).toBe('Missing or invalid file')
    }
  })

  it('rejects a file above the size limit', () => {
    const parsed = reportUploadSchema.safeParse({
      file: fileOf('report.xml', 10 * 1024 * 1024 + 1),
    })
    expect(parsed.success).toBe(false)
    expect(parsed.error?.issues[0]?.message).toBe(
      'File too large. Maximum size is 10 MB',
    )
  })

  it('rejects a disallowed extension', () => {
    const parsed = reportUploadSchema.safeParse({ file: fileOf('report.txt') })
    expect(parsed.success).toBe(false)
    expect(parsed.error?.issues[0]?.message).toBe(
      'Invalid file type. Allowed: .xml, .gz, .gzip, .zip',
    )
  })

  it('reports the size problem first when both checks fail', () => {
    const parsed = reportUploadSchema.safeParse({
      file: fileOf('report.txt', 10 * 1024 * 1024 + 1),
    })
    expect(parsed.error?.issues[0]?.message).toBe(
      'File too large. Maximum size is 10 MB',
    )
  })
})
