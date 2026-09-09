import type { DmarcTagInfo } from '@/types/diagnostics'
import { describe, expect, it } from 'vitest'
import { parseDmarcTags } from '../src/services/diagnostics/parseDmarcTags'

const DEFAULT_MARK = '(default value)'

describe('parseDmarcTags', () => {
  function findTag(
    tags: DmarcTagInfo[],
    name: string,
  ): DmarcTagInfo | undefined {
    return tags.find((t) => t.tag.startsWith(`${name}=`))
  }

  it('parses a fully specified record without adding defaults', () => {
    const record =
      'v=DMARC1; p=reject; sp=quarantine; rua=mailto:dmarc@example.com; ' +
      'ruf=mailto:forensics@example.com; adkim=s; aspf=s; pct=50; fo=1; ' +
      'rf=afrf; ri=3600'
    const tags = parseDmarcTags(record)

    expect(tags).toHaveLength(11)
    expect(tags.map((t) => t.tag)).toEqual([
      'v=DMARC1',
      'p=reject',
      'sp=quarantine',
      'rua=mailto:dmarc@example.com',
      'ruf=mailto:forensics@example.com',
      'adkim=s',
      'aspf=s',
      'pct=50',
      'fo=1',
      'rf=afrf',
      'ri=3600',
    ])
    expect(tags.every((t) => !t.description.includes(DEFAULT_MARK))).toBe(true)
  })

  it('adds defaults for optional tags in a minimal record', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none')

    expect(tags).toHaveLength(8)
    expect(findTag(tags, 'adkim')?.value).toBe('r')
    expect(findTag(tags, 'aspf')?.value).toBe('r')
    expect(findTag(tags, 'pct')?.value).toBe('100')
    expect(findTag(tags, 'fo')?.value).toBe('0')
    expect(findTag(tags, 'rf')?.value).toBe('afrf')
    expect(findTag(tags, 'ri')?.value).toBe('86400')
    expect(findTag(tags, 'adkim')?.description).toContain(DEFAULT_MARK)
    expect(findTag(tags, 'v')?.description).not.toContain(DEFAULT_MARK)
  })

  it('describes each policy value distinctly', () => {
    const reject = parseDmarcTags('v=DMARC1; p=reject')
    const quarantine = parseDmarcTags('v=DMARC1; p=quarantine')
    const none = parseDmarcTags('v=DMARC1; p=none')

    expect(findTag(reject, 'p')?.description).toContain('rejected')
    expect(findTag(quarantine, 'p')?.description).toContain('quarantined')
    expect(findTag(none, 'p')?.description).toContain('monitoring-only')
  })

  it('describes strict alignment when adkim/aspf are set to s', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none; adkim=s; aspf=s')

    expect(findTag(tags, 'adkim')?.description).toContain('strict')
    expect(findTag(tags, 'aspf')?.description).toContain('strict')
  })

  it('converts the ri interval to hours in its description', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none; ri=3600')

    expect(findTag(tags, 'ri')?.description).toContain(
      '3600 seconds equals 1 hour(s)',
    )
  })

  it('describes the default ri of 86400 seconds as 24 hours', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none')

    expect(findTag(tags, 'ri')?.description).toContain(
      '86400 seconds equals 24 hour(s)',
    )
  })

  it('tolerates missing spaces and trailing semicolons', () => {
    const tags = parseDmarcTags('v=DMARC1;p=reject;rua=mailto:a@b.c;')

    expect(tags.map((t) => t.tag)).toContain('v=DMARC1')
    expect(tags.map((t) => t.tag)).toContain('p=reject')
    expect(tags.map((t) => t.tag)).toContain('rua=mailto:a@b.c')
  })

  it('lowercases tag names but preserves values', () => {
    const tags = parseDmarcTags('V=DMARC1; P=REJECT')

    expect(findTag(tags, 'v')?.tag).toBe('v=DMARC1')
    expect(findTag(tags, 'p')?.tag).toBe('p=REJECT')
    expect(findTag(tags, 'p')?.description).toContain('rejected')
  })

  it('describes unknown tags generically', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none; foo=bar')

    expect(findTag(tags, 'foo')?.description).toBe(
      'Tag "foo" with value "bar".',
    )
  })

  it('skips segments without an equals sign', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none; garbage')

    expect(tags.some((t) => t.tag.includes('garbage'))).toBe(false)
    expect(tags).toHaveLength(8)
  })

  it('returns only defaults for an empty record', () => {
    const tags = parseDmarcTags('')

    expect(tags).toHaveLength(6)
    expect(tags.every((t) => t.description.includes(DEFAULT_MARK))).toBe(true)
  })

  it('keeps both entries when a tag is duplicated', () => {
    const tags = parseDmarcTags('v=DMARC1; p=none; p=reject')

    const policies = tags.filter((t) => t.tag.startsWith('p='))
    expect(policies.map((t) => t.value)).toEqual(['none', 'reject'])
  })

  it('supports multiple rua addresses in a single tag', () => {
    const tags = parseDmarcTags(
      'v=DMARC1; p=none; rua=mailto:a@example.com,mailto:b@example.net',
    )

    expect(findTag(tags, 'rua')?.value).toBe(
      'mailto:a@example.com,mailto:b@example.net',
    )
  })
})
