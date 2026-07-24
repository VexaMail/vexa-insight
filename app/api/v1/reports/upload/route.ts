import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { parseDmarcFile } from '@/services/dmarc'
import { ingestParsedReport } from '@/services/reports'

import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { reportUploadSchema } from './reportUploadSchema'
import { UPLOAD_LIMIT } from './uploadLimit'

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:write')
    if (denied) return denied
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
    const parsed = reportUploadSchema.safeParse({ file: formData.get('file') })
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message:
              parsed.error.issues[0]?.message ?? 'Missing or invalid file',
          },
        },
        { status: 400 },
      )
    }
    const { file } = parsed.data
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
