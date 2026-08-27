import { MAX_FILE_SIZE } from '@/utils/dmarc'
import { z } from 'zod'
import { ALLOWED_EXT } from './allowedExt'

/**
 * Multipart payload of the report upload endpoint. Only the `file` part is
 * accepted; its bytes are parsed later by the DMARC parser.
 */
export const reportUploadSchema = z.object({
  file: z
    .instanceof(File, { error: 'Missing or invalid file' })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB`,
    })
    .refine((file) => ALLOWED_EXT.test(file.name), {
      error: 'Invalid file type. Allowed: .xml, .gz, .gzip, .zip',
    }),
})
