import type { UploadReportResult } from '@/types/upload'

/**
 * One status line for a batch: a single file keeps its own message, several
 * files say how many were accepted.
 */
export function summarizeUploadBatch(
  results: readonly UploadReportResult[],
): Pick<UploadReportResult, 'status' | 'message'> {
  const [only] = results
  if (results.length === 1 && only) {
    return { status: only.status, message: only.message }
  }
  const accepted = results.filter((r) => r.status === 'success').length
  const failed = results.length - accepted
  return {
    status: failed > 0 ? 'error' : 'success',
    message:
      failed > 0
        ? `${String(accepted)} of ${String(results.length)} files uploaded; ${String(failed)} failed. Each outcome is under Results.`
        : `${String(accepted)} files uploaded. Each report is linked under Results.`,
  }
}
