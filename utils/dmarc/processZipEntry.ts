import type yauzl from 'yauzl'
import { handleReadStream } from './handleReadStream'

export function processZipEntry(
  z: yauzl.ZipFile,
  entry: yauzl.Entry,
  entries: { uncompressedSize: number }[],
  currentXmlBuffer: Buffer | null,
  setXmlBuffer: (b: Buffer) => void,
  readNext: () => void,
) {
  entries.push({ uncompressedSize: entry.uncompressedSize })
  const isXml = entry.fileName.toLowerCase().endsWith('.xml')

  if (isXml && currentXmlBuffer === null) {
    z.openReadStream(
      entry,
      (err2: Error | null, readStream: NodeJS.ReadableStream | undefined) => {
        handleReadStream(err2, readStream, setXmlBuffer, readNext)
      },
    )
  } else {
    readNext()
  }
}
