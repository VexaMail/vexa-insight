import { generateDiagnosticsInsights } from '@/services/ai'
import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { diagnosticsInsightsRequestSchema } from '@/validators/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { aiErrorResponse } from '../aiErrorResponse'
import { checkAiRateLimit } from '../checkAiRateLimit'

/**
 * POST /api/v1/ai/diagnostics-insights
 * Generates AI-powered insights for domain diagnostics.
 * Body: { domainName: string, domainId: number, startDate?: string, endDate?: string }
 */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('ai:invoke')
    if (denied) return denied
    const limited = checkAiRateLimit(request, 'ai-diag')
    if (limited) return limited
    try {
      const body: unknown = await request.json()
      const parsed = diagnosticsInsightsRequestSchema.safeParse(body)

      if (!parsed.success) {
        return NextResponse.json(
          {
            error: {
              code: 'INVALID_INPUT',
              message: 'Valid domainName and domainId are required.',
            },
          },
          { status: 400 },
        )
      }

      const { domainName, domainId, startDate, endDate } = parsed.data
      const result = await generateDiagnosticsInsights({
        domainName,
        domainId,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      })

      return NextResponse.json({ data: result })
    } catch (err: unknown) {
      return aiErrorResponse(err, '[ai/diagnostics-insights]')
    }
  },
)
