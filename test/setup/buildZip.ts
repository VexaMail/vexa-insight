import zlib from 'node:zlib'
import type { ZipEntryInput } from './ZipEntryInput'

/**
 * Builds a minimal STORE-method (compression=0) ZIP archive in memory.
 *
 * Emits, in order:
 *   - one local file header + uncompressed payload per entry,
 *   - the central directory headers, and
 *   - the end-of-central-directory record.
 *
 * Sufficient for unit tests that exercise our zip-reading code paths
 * (zip-slip filenames, MAX_FILES_IN_ARCHIVE, multi-XML selection).
 * Not optimized for production use.
 */
export function buildZip(entries: ZipEntryInput[]): Buffer {
  const localChunks: Buffer[] = []
  const centralChunks: Buffer[] = []
  let offset = 0

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, 'utf8')
    const crc = zlib.crc32(entry.content)
    const size = entry.content.length

    // Local file header (signature 0x04034b50)
    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4) // version needed
    local.writeUInt16LE(0x0800, 6) // gp flag bit 11: UTF-8 filename (EFS)
    local.writeUInt16LE(0, 8) // compression method = stored
    local.writeUInt16LE(0, 10) // mod time
    local.writeUInt16LE(0, 12) // mod date
    local.writeUInt32LE(crc, 14) // crc32
    local.writeUInt32LE(size, 18) // compressed size
    local.writeUInt32LE(size, 22) // uncompressed size
    local.writeUInt16LE(nameBuf.length, 26)
    local.writeUInt16LE(0, 28) // extra field length
    localChunks.push(local, nameBuf, entry.content)

    // Central directory header (signature 0x02014b50)
    const central = Buffer.alloc(46)
    central.writeUInt32LE(0x02014b50, 0)
    central.writeUInt16LE(20, 4) // version made by
    central.writeUInt16LE(20, 6) // version needed
    central.writeUInt16LE(0x0800, 8) // gp flag bit 11: UTF-8 filename (EFS)
    central.writeUInt16LE(0, 10) // method
    central.writeUInt16LE(0, 12)
    central.writeUInt16LE(0, 14)
    central.writeUInt32LE(crc, 16)
    central.writeUInt32LE(size, 20)
    central.writeUInt32LE(size, 24)
    central.writeUInt16LE(nameBuf.length, 28)
    central.writeUInt16LE(0, 30) // extra
    central.writeUInt16LE(0, 32) // comment
    central.writeUInt16LE(0, 34) // disk number start
    central.writeUInt16LE(0, 36) // internal attrs
    central.writeUInt32LE(0, 38) // external attrs
    central.writeUInt32LE(offset, 42) // local header offset
    centralChunks.push(central, nameBuf)

    offset += local.length + nameBuf.length + entry.content.length
  }

  const localPart = Buffer.concat(localChunks)
  const centralPart = Buffer.concat(centralChunks)
  const centralOffset = localPart.length

  // End of central directory (signature 0x06054b50)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(0, 4) // disk number
  eocd.writeUInt16LE(0, 6) // disk with central dir start
  eocd.writeUInt16LE(entries.length, 8) // entries on this disk
  eocd.writeUInt16LE(entries.length, 10) // total entries
  eocd.writeUInt32LE(centralPart.length, 12) // central dir size
  eocd.writeUInt32LE(centralOffset, 16) // central dir offset
  eocd.writeUInt16LE(0, 20) // comment length

  return Buffer.concat([localPart, centralPart, eocd])
}
