import yauzl from 'yauzl'
import { finalizeZipExtraction } from './finalizeZipExtraction'
import { processZipEntry } from './processZipEntry'

export function extractXmlFromZipImpl(
  fileContent: Buffer,
  resolve: (value: Buffer | null) => void,
  reject: (reason?: Error) => void,
) {
  let xmlBuffer: Buffer | null = null
  const entries: { uncompressedSize: number }[] = []

  yauzl.fromBuffer(
    fileContent,
    { lazyEntries: true },
    (err: Error | null, zipFile: yauzl.ZipFile | undefined) => {
      if (err || !zipFile) {
        resolve(null)
        return
      }

      // Surface yauzl's own validation errors (invalid filenames, malformed
      // archive structure, etc.) instead of letting them become uncaught
      // exceptions that leave the promise unsettled and hang the caller.
      zipFile.on('error', () => resolve(null))

      zipFile.on('entry', (entry: yauzl.Entry) => {
        processZipEntry(
          zipFile,
          entry,
          entries,
          xmlBuffer,
          (buf) => {
            xmlBuffer = buf
          },
          () => zipFile.readEntry(),
        )
      })

      zipFile.on('end', () => {
        finalizeZipExtraction(entries, xmlBuffer, resolve, reject)
      })

      zipFile.readEntry()
    },
  )
}
