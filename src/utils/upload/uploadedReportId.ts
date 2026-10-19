import type { UploadReportResponse } from '@/types/upload'

/** Id of the report an accepted upload was stored as, if the server sent it. */
export function uploadedReportId(json: UploadReportResponse): number | null {
  const data = 'data' in json ? json.data : undefined
  return data?.reportId ?? null
}
