import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ip: string }> },
) {
  const { ip } = await params
  const db = getDb()

  try {
    const [record] = await db
      .select({
        ip: ipHostnameEnrichments.ip,
        hostname: ipHostnameEnrichments.hostname,
        lookupStatus: ipHostnameEnrichments.lookupStatus,
        lastLookupAt: ipHostnameEnrichments.lastLookupAt,
        nextLookupAt: ipHostnameEnrichments.nextLookupAt,
        error: ipHostnameEnrichments.lookupError,
      })
      .from(ipHostnameEnrichments)
      .where(eq(ipHostnameEnrichments.ip, ip))
      .limit(1)

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
}
