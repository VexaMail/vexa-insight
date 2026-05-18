import { getDb, ipAddresses } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { COUNTRY_CODES } from './demoCountryCodes'
import { pickRandom } from './pickRandom'

export async function ensureDemoIp(ip: string, now: Date): Promise<number> {
  const db = getDb()
  const existing = db
    .select({ id: ipAddresses.id })
    .from(ipAddresses)
    .where(eq(ipAddresses.ip, ip))
    .get()
  if (existing) return existing.id
  const inserted = db
    .insert(ipAddresses)
    .values({
      ip,
      countryCode: pickRandom(COUNTRY_CODES),
      emailsSentCount: 0,
      firstSeenAt: now,
      lastSeenAt: now,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: ipAddresses.id })
    .get()
  return inserted.id
}
