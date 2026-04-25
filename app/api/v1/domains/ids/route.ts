import { domains, getDb } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { desc, inArray } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    return NextResponse.json({ data: [] })
  }

  const query = db.select({ id: domains.id }).from(domains)

  if (allowedIds !== null) {
    query.where(inArray(domains.id, allowedIds))
  }

  const result = await query.orderBy(desc(domains.updatedAt))
  const data = result.map((r) => r.id.toString())

  return NextResponse.json({ data })
}
