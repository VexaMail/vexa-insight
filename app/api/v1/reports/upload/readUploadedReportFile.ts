import type { NextRequest } from 'next/server'
import { reportUploadSchema } from './reportUploadSchema'
import { uploadBadRequest } from './uploadBadRequest'
import type { UploadedReportFile } from './UploadedReportFile'

/** The validated multipart file as a buffer, or the 400 to send back. */
export async function readUploadedReportFile(
  request: NextRequest,
): Promise<UploadedReportFile> {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return { ok: false, response: uploadBadRequest('Invalid form data') }
  }
  const parsed = reportUploadSchema.safeParse({ file: formData.get('file') })
  if (!parsed.success) {
    return {
      ok: false,
      response: uploadBadRequest(
        parsed.error.issues[0]?.message ?? 'Missing or invalid file',
      ),
    }
  }
  const { file } = parsed.data
  try {
    return {
      ok: true,
      name: file.name,
      buffer: Buffer.from(await file.arrayBuffer()),
    }
  } catch {
    return { ok: false, response: uploadBadRequest('Failed to read file') }
  }
}
