import type { AIServiceError } from '@/services/ai'
import { generateReportInsights } from '@/services/ai'
import { withApiAuth } from '@/services/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/v1/ai/report-insights
 * Generates AI-powered insights for a DMARC report.
 * Body: { reportId: number }
 */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    try {
      const body = (await request.json()) as { reportId?: number }
      const reportId = body.reportId

      if (!reportId || typeof reportId !== 'number' || reportId < 1) {
        return NextResponse.json(
          {
            error: {
              code: 'INVALID_INPUT',
              message: 'Valid reportId is required.',
            },
          },
          { status: 400 },
        )
      }

      const result = await generateReportInsights({ reportId })
      return NextResponse.json({ data: result })
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'code' in err) {
        const aiError = err as AIServiceError
        const statusMap: Record<string, number> = {
          NOT_CONFIGURED: 422,
          UNAUTHORIZED: 401,
          RATE_LIMITED: 429,
          PROVIDER_UNAVAILABLE: 503,
          TIMEOUT: 504,
          MALFORMED_RESPONSE: 502,
          INSUFFICIENT_DATA: 422,
          UNKNOWN: 500,
        }
        const status = statusMap[aiError.code] ?? 500
        return NextResponse.json(
          { error: { code: aiError.code, message: aiError.message } },
          { status },
        )
      }
      console.error('[ai/report-insights] Unexpected error:', err)
      return NextResponse.json(
        {
          error: { code: 'UNKNOWN', message: 'An unexpected error occurred.' },
        },
        { status: 500 },
      )
    }
  },
)
