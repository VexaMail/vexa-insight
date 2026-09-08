import type { ProcessChunkInput } from '@/types/imap'

/** Status line announcing the message range a chunk is about to scan. */
export function chunkScanMessage(input: ProcessChunkInput): string {
  const start = input.chunkIndex * input.chunkSize
  const end = Math.min(start + input.chunkSize, input.folderTotalEmails)
  const total = input.folderTotalEmails.toLocaleString()

  return `Scanning emails ${(start + 1).toLocaleString()}–${end.toLocaleString()} of ${total} in ${input.folder}…`
}
