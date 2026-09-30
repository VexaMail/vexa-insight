import { ingestTlsReport } from '@/services/tlsrpt'
import type { TlsReport } from '@/types/tlsrpt'
import { NextResponse } from 'next/server'

/**
 * Stores an uploaded TLS report and answers in the same shape as an
 * aggregate upload: the domain field lists the policy domains, and the record
 * count is the number of policies.
 */
export function ingestUploadedTlsReport(report: TlsReport): NextResponse {
  const result = ingestTlsReport(report)
  if (!result.ingested) {
    return NextResponse.json(
      {
        error: {
          code: 'CONFLICT',
          message: 'Report already exists (duplicate report_id)',
        },
      },
      { status: 409 },
    )
  }
  const domains = Array.from(
    new Set(report.policies.map((p) => p.policyDomain)),
  )
  return NextResponse.json(
    {
      data: {
        reportId: result.tlsReportId,
        kind: 'tlsrpt',
        domain: domains.join(', '),
        processedRecords: report.policies.length,
      },
    },
    { status: 201 },
  )
}
