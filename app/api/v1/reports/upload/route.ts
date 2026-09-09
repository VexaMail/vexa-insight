import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { parseDmarcFile } from '@/services/dmarc'
import { ingestParsedReport } from '@/services/reports'

import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { readUploadedReportFile } from './readUploadedReportFile'
import { uploadBadRequest } from './uploadBadRequest'
import { UPLOAD_LIMIT } from './uploadLimit'
import { UPLOAD_WINDOW_MS } from './uploadWindowMs'

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:write')
    if (denied) return denied
    const key = getRateLimitKey(request)
    if (!checkRateLimit(key, UPLOAD_LIMIT, UPLOAD_WINDOW_MS)) {
      return NextResponse.json(
        {
          error: { code: 'TOO_MANY_REQUESTS', message: 'Rate limit exceeded' },
        },
        { status: 429 },
      )
    }
    const upload = await readUploadedReportFile(request)
    if (!upload.ok) return upload.response
    let parseResult
    try {
      parseResult = await parseDmarcFile(upload.buffer, upload.name)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return uploadBadRequest(`Parse failed: ${message}`)
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
