import type { AIServiceError } from '@/services/ai'
import { generateDiagnosticsInsights } from '@/services/ai'
import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import { diagnosticsInsightsRequestSchema } from '@/validators/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/v1/ai/diagnostics-insights
 * Generates AI-powered insights for domain diagnostics.
 * Body: { domainName: string, domainId: number, startDate?: string, endDate?: string }
 */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('ai:invoke')
    if (denied) return denied
    const AI_LIMIT = 10
    const AI_WINDOW_MS = 60_000
    const rlKey = `ai-diag:${getRateLimitKey(request)}`
    if (!checkRateLimit(rlKey, AI_LIMIT, AI_WINDOW_MS)) {
      return NextResponse.json(
        {
          error: {
            code: 'TOO_MANY_REQUESTS',
            message: 'AI rate limit exceeded',
          },
        },
        { status: 429 },
      )
    }
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
      console.error('[ai/diagnostics-insights] Unexpected error:', err)
      return NextResponse.json(
        {
          error: { code: 'UNKNOWN', message: 'An unexpected error occurred.' },
        },
        { status: 500 },
      )
    }
  },
)
