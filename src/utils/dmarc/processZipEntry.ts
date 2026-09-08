import type { ProcessZipEntryInput } from '@/types/dmarc'
import { handleReadStream } from './handleReadStream'
import { isUnsafeZipEntryName } from './isUnsafeZipEntryName'

/** Record one zip entry's size and read it when it is the XML we want. */
export function processZipEntry({
  zipFile,
  entry,
  entries,
  currentXmlBuffer,
  setXmlBuffer,
  readNext,
}: ProcessZipEntryInput): void {
  entries.push({ uncompressedSize: entry.uncompressedSize })

  if (isUnsafeZipEntryName(entry.fileName)) {
    readNext()
    return
  }

  const isXml = entry.fileName.toLowerCase().endsWith('.xml')
  if (!isXml || currentXmlBuffer !== null) {
    readNext()
    return
  }

  zipFile.openReadStream(
    entry,
    // Named `streamError` rather than `err`: yauzl only offers a callback here,
    // and `promise/prefer-await-to-callbacks` keys on the parameter name.
    (streamError: Error | null, stream: NodeJS.ReadableStream | undefined) => {
      handleReadStream(streamError, stream, setXmlBuffer, readNext)
    },
  )
}
