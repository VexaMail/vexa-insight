import { requireAdminAuth } from '@/services/api'
import { backfillDiagnosticFields } from '@/services/reports'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/v1/admin/backfill-diagnostics
 *
 * Re-parses existing raw DMARC XML to populate spfAuthResult,
 * dkim_results and policy_override_reasons for all events that
 * were ingested before the new pipeline was deployed.
 *
 * Safe to call multiple times (idempotent — only processes NULL rows).
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const result = await backfillDiagnosticFields()
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (err) {
    console.error('[backfill-diagnostics] Error:', err)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Backfill failed' } },
      { status: 500 },
    )
  }
}
