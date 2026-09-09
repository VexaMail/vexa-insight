import {
  getDb,
  normalizedEventPolicyOverrides,
  normalizedEvents,
} from '@/lib/db'
import type { DiagnosticStats } from '@/types/diagnostics'
import { eq } from 'drizzle-orm'
import { buildDiagnosticStatsWhere } from './buildDiagnosticStatsWhere'
import { diagnosticAuthStatsSelection } from './diagnosticAuthStatsSelection'
import { diagnosticOverrideStatsSelection } from './diagnosticOverrideStatsSelection'
import { emptyDiagnosticStats } from './emptyDiagnosticStats'
import type { GetDiagnosticStatsParams } from './GetDiagnosticStatsParams'

export async function getDiagnosticStats(
  params: GetDiagnosticStatsParams,
): Promise<DiagnosticStats> {
  const db = getDb()
  const whereClause = buildDiagnosticStatsWhere(params)

  const [row] = await db
    .select(diagnosticAuthStatsSelection)
    .from(normalizedEvents)
    .where(whereClause)

  const [overrideRow] = await db
    .select(diagnosticOverrideStatsSelection)
    .from(normalizedEventPolicyOverrides)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventPolicyOverrides.eventId, normalizedEvents.id),
    )
    .where(whereClause)

  return { ...emptyDiagnosticStats, ...row, ...overrideRow }
}
