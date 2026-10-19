import { withApiAuth } from '@/services/api'
import {
  getReports,
  getReportsByDomainId,
  getReportsInDateRange,
} from '@/services/reports'
import {
  dateRangeQuerySchema,
  domainIdQuerySchema,
  nonEmptyTextQuerySchema,
  pageQuerySchema,
  reportsPageSizeQuerySchema,
} from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const page = pageQuerySchema.parse(searchParams.get('page') ?? undefined)
    const pageSize = reportsPageSizeQuerySchema.parse(
      searchParams.get('pageSize') ?? undefined,
    )

    const domainId = domainIdQuerySchema.parse(searchParams.get('domainId'))
    const org = nonEmptyTextQuerySchema.parse(searchParams.get('org'))
    const domain = nonEmptyTextQuerySchema.parse(searchParams.get('domain'))

    if (domainId) {
      const rows = await getReportsByDomainId(domainId, org)
      const start = (page - 1) * pageSize
      const paginated = rows.slice(start, start + pageSize)
      const data = {
        items: paginated,
        total: rows.length,
        page,
        pageSize,
      }
      return NextResponse.json({ data })
    }

    const { from, to } = dateRangeQuerySchema.parse(
      Object.fromEntries(searchParams),
    )
    if (from ?? to) {
      const data = await getReportsInDateRange({
        page,
        pageSize,
        from,
        to,
        org,
        domain,
      })
      return NextResponse.json({ data })
    }

    const data = await getReports(page, pageSize, org, domain)
    return NextResponse.json({ data })
  },
)
