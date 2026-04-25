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
