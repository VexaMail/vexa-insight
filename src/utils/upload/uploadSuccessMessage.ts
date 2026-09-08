import type { UploadReportResponse } from '@/types/upload'

/** One-line summary of an accepted upload: report, domain and record count. */
export function uploadSuccessMessage(json: UploadReportResponse): string {
  const data = 'data' in json ? json.data : undefined
  return `Report #${String(data?.reportId ?? '—')} — ${data?.domain ?? '—'} — ${String(data?.processedRecords ?? 0)} records`
}
