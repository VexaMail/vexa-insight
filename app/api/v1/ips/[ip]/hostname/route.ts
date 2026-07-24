import { withApiAuth } from '@/services/api'
import { getIpHostnameEnrichment } from '@/services/ip-hostname'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (
    _request: NextRequest,
    { params }: { params: Promise<{ ip: string }> },
  ): Promise<NextResponse> => {
    const { ip } = await params

    try {
      const record = await getIpHostnameEnrichment(ip)

      if (!record) {
        return NextResponse.json(
          { ip, hostname: null, lookupStatus: 'not_found_in_db' },
          { status: 200 },
        )
      }

      return NextResponse.json(record, { status: 200 })
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch hostname enrichment details' },
        { status: 500 },
      )
    }
  },
)
