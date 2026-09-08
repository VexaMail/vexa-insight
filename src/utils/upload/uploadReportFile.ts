import type { UploadReportResponse, UploadReportResult } from '@/types/upload'
import { uploadFailureMessage } from './uploadFailureMessage'
import { uploadSuccessMessage } from './uploadSuccessMessage'

/** Posts one DMARC report file and reduces the response to a UI message. */
export async function uploadReportFile(
  file: File,
): Promise<UploadReportResult> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await fetch('/api/v1/reports/upload', {
      method: 'POST',
      body: formData,
    })
    const json = (await res.json()) as UploadReportResponse
    if (!res.ok) {
      return {
        status: 'error',
        message: uploadFailureMessage(json, res.status),
      }
    }
    return { status: 'success', message: uploadSuccessMessage(json) }
  } catch {
    return { status: 'error', message: 'Upload failed.' }
  }
}
