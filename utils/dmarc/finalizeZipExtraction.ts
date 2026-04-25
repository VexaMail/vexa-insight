import { MAX_UNCOMPRESSED_SIZE } from './constants'
import { MAX_FILES_IN_ARCHIVE } from './maxFilesInArchive'

export function finalizeZipExtraction(
  entries: { uncompressedSize: number }[],
  xmlBuffer: Buffer | null,
  resolve: (value: Buffer | null) => void,
  reject: (reason?: Error) => void,
) {
  if (entries.length > MAX_FILES_IN_ARCHIVE) {
    reject(
      new Error(
        `ZIP contains too many files (${entries.length}). Max ${MAX_FILES_IN_ARCHIVE}.`,
      ),
    )
    return
  }
  const total = entries.reduce((s, e) => s + e.uncompressedSize, 0)
  if (total > MAX_UNCOMPRESSED_SIZE) {
    reject(
      new Error(
        `ZIP uncompressed size too large. Possible zip bomb. Max ${MAX_UNCOMPRESSED_SIZE / 1024 / 1024} MB.`,
      ),
    )
    return
  }
  resolve(xmlBuffer)
}
