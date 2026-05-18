import { withApiAuth } from '@/services/api'
import { parseDmarcFile } from '@/services/dmarc'
import { ingestParsedReport } from '@/services/reports'

import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { MAX_FILE_SIZE } from '../../../../../utils/dmarc/maxFileSize'
import { ALLOWED_EXT } from './allowedExt'
import { UPLOAD_LIMIT } from './uploadLimit'

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const UPLOAD_WINDOW_MS = 60_000
    const key = getRateLimitKey(request)
    if (!checkRateLimit(key, UPLOAD_LIMIT, UPLOAD_WINDOW_MS)) {
      return NextResponse.json(
        {
          error: { code: 'TOO_MANY_REQUESTS', message: 'Rate limit exceeded' },
        },
        { status: 429 },
      )
    }
    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid form data' } },
        { status: 400 },
      )
    }
    const file = formData.get('file')
    if (file == null || !(file instanceof File)) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Missing or invalid file' } },
        { status: 400 },
      )
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB`,
          },
        },
        { status: 400 },
      )
    }
    if (!ALLOWED_EXT.test(file.name)) {
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message: 'Invalid file type. Allowed: .xml, .gz, .gzip, .zip',
          },
        },
        { status: 400 },
      )
    }
    let buffer: Buffer
    try {
      buffer = Buffer.from(await file.arrayBuffer())
    } catch {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Failed to read file' } },
        { status: 400 },
      )
    }
    let parseResult
    try {
      parseResult = await parseDmarcFile(buffer, file.name)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: `Parse failed: ${message}` } },
        { status: 400 },
      )
    }
    const ingestResult = await ingestParsedReport(parseResult)
    if (!ingestResult.ingested) {
      return NextResponse.json(
        {
          error: {
            code: 'CONFLICT',
            message: 'Report already exists (duplicate report_id)',
          },
        },
        { status: 409 },
      )
    }
    return NextResponse.json(
      {
        data: {
          reportId: ingestResult.rawReportId,
          domain: parseResult.domain,
          processedRecords: parseResult.events.length,
        },
      },
      { status: 201 },
    )
  },
)
