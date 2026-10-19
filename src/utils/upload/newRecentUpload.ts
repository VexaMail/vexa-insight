import type { RecentUpload, UploadReportResult } from '@/types/upload'
import { format } from 'date-fns'

/** Builds the recent-uploads entry for one finished upload. */
export function newRecentUpload(
  name: string,
  result: UploadReportResult,
  finishedAt: Date = new Date(),
): RecentUpload {
  return {
    id: crypto.randomUUID(),
    name,
    status: result.status,
    message: result.message,
    reportId: result.reportId,
    time: format(finishedAt, 'HH:mm:ss'),
  }
}
