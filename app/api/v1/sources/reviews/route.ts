import { withApiAuth } from '@/services/api'
import { getSessionActor, requirePermission } from '@/services/auth'
import {
  clearSourceReview,
  listSourceReviews,
  setSourceReview,
} from '@/services/source-reviews'
import { sourceReviewInputSchema } from '@/validators/source-reviews'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** Verdicts for one domain (`?domain=`) or one source (`?ip=`). */
export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const params = request.nextUrl.searchParams
    const domainName = params.get('domain') ?? undefined
    const ip = params.get('ip') ?? undefined
    if (!domainName && !ip) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'domain or ip is required' } },
        { status: 400 },
      )
    }
    return NextResponse.json({
      data: await listSourceReviews({ domainName, ip }),
    })
  },
)

/** Mark a source legitimate, a forwarder or unauthorized for a domain. */
export const PUT = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:write')
    if (denied) return denied
    const parsed = sourceReviewInputSchema.safeParse(
      await request.json().catch(() => null),
    )
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message: parsed.error.issues[0]?.message ?? 'Invalid input',
          },
        },
        { status: 400 },
      )
    }
    const { domain, ...rest } = parsed.data
    await setSourceReview({
      ...rest,
      domainName: domain.toLowerCase(),
      actor: await getSessionActor(),
    })
    return NextResponse.json({ data: { saved: true } })
  },
)

/** Drop the verdict (`?ip=&domain=`). */
export const DELETE = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:write')
    if (denied) return denied
    const params = request.nextUrl.searchParams
    const ip = params.get('ip')
    const domain = params.get('domain')
    if (!ip || !domain) {
      return NextResponse.json(
        {
          error: { code: 'BAD_REQUEST', message: 'ip and domain are required' },
        },
        { status: 400 },
      )
    }
    await clearSourceReview(ip, domain.toLowerCase())
    return NextResponse.json({ data: { removed: true } })
  },
)
