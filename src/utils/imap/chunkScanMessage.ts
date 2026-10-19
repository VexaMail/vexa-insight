import type { ProcessChunkInput } from '@/types/imap'

/** Status line announcing the message range a chunk is about to scan. */
export function chunkScanMessage(input: ProcessChunkInput): string {
  const start = input.chunkIndex * input.chunkSize
  const end = Math.min(start + input.chunkSize, input.folderTotalEmails)
  const total = input.folderTotalEmails.toLocaleString('en-US')

  return `Scanning emails ${(start + 1).toLocaleString('en-US')}–${end.toLocaleString('en-US')} of ${total} in ${input.folder}…`
}
