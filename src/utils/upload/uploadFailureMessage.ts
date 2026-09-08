import type { UploadReportResponse } from '@/types/upload'

/** Server-supplied reason a report upload was rejected, or the status code. */
export function uploadFailureMessage(
  json: UploadReportResponse,
  status: number,
): string {
  const error = 'error' in json ? json.error : undefined
  return error?.message ?? `Error ${String(status)}`
}
