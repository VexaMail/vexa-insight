import { withApiAuth } from '@/services/api'
import {
  getLatestReports,
  getReports,
  getReportsByDomainId,
} from '@/services/reports'
import { parseDateParams } from '@/utils/api'
import { coerceNumber } from '@/utils/validation'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { DEFAULT_PAGE } from './defaultPage'
import { DEFAULT_PAGE_SIZE } from './defaultPageSize'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const MAX_PAGE_SIZE = 100
    const { searchParams } = new URL(request.url)
    const pageRaw = coerceNumber(searchParams.get('page')) ?? DEFAULT_PAGE
    const pageSizeRaw =
      coerceNumber(searchParams.get('pageSize')) ?? DEFAULT_PAGE_SIZE

    const page = Math.max(1, Math.floor(pageRaw))
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, Math.floor(pageSizeRaw)),
    )

    const domainId = coerceNumber(searchParams.get('domainId'))
    const orgRaw = searchParams.get('org')
    const org = orgRaw && orgRaw.length > 0 ? orgRaw : undefined
    const domainRaw = searchParams.get('domain')
    const domain = domainRaw && domainRaw.length > 0 ? domainRaw : undefined

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

    const { from, to } = parseDateParams(searchParams)
    if (from ?? to) {
      const items = await getLatestReports(pageSize, from, to, org, domain)
      return NextResponse.json({
        data: { items, total: items.length, page, pageSize },
      })
    }

    const data = await getReports(page, pageSize, org, domain)
    return NextResponse.json({ data })
  },
)
