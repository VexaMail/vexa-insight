import type yauzl from 'yauzl'

/** One zip entry plus the extraction state the walk carries between entries. */
export type ProcessZipEntryInput = {
  zipFile: yauzl.ZipFile
  entry: yauzl.Entry
  entries: { uncompressedSize: number }[]
  currentXmlBuffer: Buffer | null
  setXmlBuffer: (buffer: Buffer) => void
  readNext: () => void
}
