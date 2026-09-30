import { SENDER_CATALOG } from '@/constants/senders'
import { classifySender } from '@/utils/senders'
import { describe, expect, it } from 'vitest'

const CATEGORIES = new Set([
  'mailbox-provider',
  'email-service',
  'marketing',
  'crm',
  'support',
  'security-gateway',
  'hosting',
  'mailing-list',
])

describe('SENDER_CATALOG', () => {
  it('has a name, a known category and lower-case domains in every entry', () => {
    for (const entry of SENDER_CATALOG) {
      expect(entry.name).not.toBe('')
      expect(CATEGORIES.has(entry.category)).toBe(true)
      expect(entry.domains.length).toBeGreaterThan(0)
      for (const domain of entry.domains) {
        expect(domain).toMatch(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/)
      }
    }
  })

  it('lists each name once', () => {
    const names = SENDER_CATALOG.map((e) => e.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('classifySender', () => {
  it('names a source by its reverse DNS hostname', () => {
    expect(classifySender({ hostname: 'o1.ptr1234.sendgrid.net.' })).toEqual({
      name: 'SendGrid',
      category: 'email-service',
      matchedOn: 'hostname',
    })
  })

  it('falls back to the DKIM signing domains', () => {
    expect(
      classifySender({
        hostname: 'host.unknown.example',
        dkimDomains: ['example.com', 'amazonses.com'],
      }),
    ).toMatchObject({ name: 'Amazon SES', matchedOn: 'dkim' })
  })

  it('does not match a look-alike domain', () => {
    expect(classifySender({ hostname: 'mail.notsendgrid.net' })).toBeNull()
  })

  it('prefers the more specific entry listed first', () => {
    expect(
      classifySender({ hostname: 'mail-sor-f41.googlegroups.com' })?.name,
    ).toBe('Google Groups')
  })

  it('returns null when nothing is known', () => {
    expect(classifySender({})).toBeNull()
  })
})
