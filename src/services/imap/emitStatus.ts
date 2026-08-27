import type { FetchAttachmentsOptions } from '@/types/imap'

/**
 * Emits a status text update if the onStatus callback is configured.
 */
export async function emitStatus(
  options: FetchAttachmentsOptions,
  text: string,
): Promise<void> {
  if (options.onStatus) {
    await options.onStatus(text)
  }
}
