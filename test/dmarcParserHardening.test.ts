import { readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import { MAX_UNCOMPRESSED_SIZE } from '../src/utils/dmarc/constants'
import { extractXmlFromBuffer } from '../src/utils/dmarc/extractXmlFromBuffer'
import { parseDmarcXml } from '../src/utils/dmarc/parseDmarcXml'

describe('DMARC parser hardening', () => {
  it('refuses XML with DOCTYPE', () => {
    const xml = readFileSync(
      path.join(__dirname, 'fixtures', 'dmarc', 'billion-laughs.xml'),
    )
    expect(() => parseDmarcXml(xml)).toThrow(/DOCTYPE/)
  })

  it('caps gunzip output size', async () => {
    const oversized = Buffer.alloc(MAX_UNCOMPRESSED_SIZE + 1024, 0x41)
    const gzipped = gzipSync(oversized)
    const out = await extractXmlFromBuffer(gzipped, 'big.xml.gz')
    expect(out).toBeNull()
  })
})
