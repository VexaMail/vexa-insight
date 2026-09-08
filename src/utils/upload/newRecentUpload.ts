import type { RecentUpload, UploadReportResult } from '@/types/upload'

/** Builds the recent-uploads entry for one finished upload. */
export function newRecentUpload(
  name: string,
  result: UploadReportResult,
): RecentUpload {
  return {
    id: crypto.randomUUID(),
    name,
    status: result.status,
    message: result.message,
    time: 'Just now',
  }
}
