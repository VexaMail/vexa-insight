/** Body of `POST /api/v1/reports/upload`, success or failure. */
export type UploadReportResponse =
  | { data?: { reportId?: number; domain?: string; processedRecords?: number } }
  | { error?: { message?: string } }
