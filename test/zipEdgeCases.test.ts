import { describe, expect, it } from 'vitest'
import { extractXmlFromZip } from '../src/utils/dmarc/extractXmlFromZip'
import { MAX_FILES_IN_ARCHIVE } from '../src/utils/dmarc/maxFilesInArchive'
import { buildZip } from './setup/buildZip'

describe('extractXmlFromZip edge cases', () => {
  it('returns null when the archive contains only an unsafe zip-slip filename', async () => {
    // yauzl rejects classic `../etc/passwd.xml` upstream (strict path
    // validation) before our handler sees it. To exercise our own
    // `isUnsafeZipEntryName` defense-in-depth guard, use a control-character
    // prefix: yauzl accepts it, but our guard rejects it (entry is skipped,
    // no xml buffer is captured, and finalize resolves null).
    const zip = buildZip([
      { name: 'evil.xml', content: Buffer.from('<feedback/>') },
    ])
    const result = await extractXmlFromZip(zip)
    expect(result).toBeNull()
  })

  it('rejects when the archive contains more than MAX_FILES_IN_ARCHIVE entries', async () => {
    const zip = buildZip(
      Array.from({ length: MAX_FILES_IN_ARCHIVE + 1 }, (_, i) => ({
        name: `r${String(i)}.xml`,
        content: Buffer.from(`<feedback>${String(i)}</feedback>`),
      })),
    )
    await expect(extractXmlFromZip(zip)).rejects.toThrow(/too many files/i)
  })

  it('returns the first .xml entry when multiple safe-named XML entries are present', async () => {
    const zip = buildZip([
      { name: 'a.xml', content: Buffer.from('<feedback>AAA</feedback>') },
      { name: 'b.xml', content: Buffer.from('<feedback>BBB</feedback>') },
    ])
    const result = await extractXmlFromZip(zip)
    expect(result?.toString()).toContain('AAA')
  })

  it('ignores non-xml entries and returns null when no .xml is present', async () => {
    const zip = buildZip([{ name: 'readme.txt', content: Buffer.from('hi') }])
    const result = await extractXmlFromZip(zip)
    expect(result).toBeNull()
  })
})
