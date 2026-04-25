import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { desc, eq, inArray } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    return NextResponse.json({ data: [] })
  }

  const query = db.selectDistinct({ id: rawReports.id }).from(rawReports)

  if (allowedIds !== null) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
    query.where(inArray(normalizedEvents.domainId, allowedIds))
  }

  const result = await query.orderBy(desc(rawReports.ingestedAt))
  const data = result.map((r) => r.id.toString())

  return NextResponse.json({ data })
}
