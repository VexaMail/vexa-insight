import type { UploadReportResponse } from '@/types/upload'

/** One-line summary of an accepted upload: domain and record count. */
export function uploadSuccessMessage(json: UploadReportResponse): string {
  const data = 'data' in json ? json.data : undefined
  const records = data?.processedRecords ?? 0
  const domain = data?.domain ?? 'unknown domain'
  return `${domain}: ${String(records)} record${records === 1 ? '' : 's'} parsed`
}
