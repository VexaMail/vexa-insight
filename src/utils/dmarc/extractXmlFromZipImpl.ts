import yauzl from 'yauzl'
import { finalizeZipExtraction } from './finalizeZipExtraction'
import { processZipEntry } from './processZipEntry'

export async function extractXmlFromZipImpl(
  fileContent: Buffer,
): Promise<Buffer | null> {
  let xmlBuffer: Buffer | null = null
  const entries: { uncompressedSize: number }[] = []

  let zipFile: yauzl.ZipFile
  try {
    zipFile = await yauzl.fromBufferPromise(fileContent, { lazyEntries: true })
  } catch {
    return null
  }

  return new Promise<Buffer | null>((resolve, reject) => {
    // Surface yauzl's own validation errors (invalid filenames, malformed
    // archive structure, etc.) instead of letting them become uncaught
    // exceptions that leave the promise unsettled and hang the caller.
    zipFile.on('error', () => {
      resolve(null)
    })

    zipFile.on('entry', (entry: yauzl.Entry) => {
      processZipEntry({
        zipFile,
        entry,
        entries,
        currentXmlBuffer: xmlBuffer,
        setXmlBuffer: (buf) => {
          xmlBuffer = buf
        },
        readNext: () => {
          zipFile.readEntry()
        },
      })
    })

    zipFile.on('end', () => {
      finalizeZipExtraction(entries, xmlBuffer, resolve, reject)
    })

    zipFile.readEntry()
  })
}
