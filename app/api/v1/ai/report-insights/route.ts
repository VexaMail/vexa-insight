import { generateReportInsights } from '@/services/ai'
import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { reportInsightsRequestSchema } from '@/validators/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { aiErrorResponse } from '../aiErrorResponse'
import { checkAiRateLimit } from '../checkAiRateLimit'

/**
 * POST /api/v1/ai/report-insights
 * Generates AI-powered insights for a DMARC report.
 * Body: { reportId: number }
 */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('ai:invoke')
    if (denied) return denied
    const limited = checkAiRateLimit(request, 'ai-report')
    if (limited) return limited
    try {
      const body: unknown = await request.json()
      const parsed = reportInsightsRequestSchema.safeParse(body)

      if (!parsed.success) {
        return NextResponse.json(
          {
            error: {
              code: 'INVALID_INPUT',
              message:
                parsed.error.issues[0]?.message ??
                'Valid reportId is required.',
            },
          },
          { status: 400 },
        )
      }

      const result = await generateReportInsights({
        reportId: parsed.data.reportId,
      })
      return NextResponse.json({ data: result })
    } catch (err: unknown) {
      return aiErrorResponse(err, '[ai/report-insights]')
    }
  },
)
