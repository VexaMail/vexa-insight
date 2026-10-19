import {
  parseAsnNameTxt,
  parseAsnOriginTxt,
  reverseIpLabels,
} from '@/utils/ip-network'
import { describe, expect, it } from 'vitest'

describe('ip network parsers', () => {
  it('reverses IPv4 octets', () => {
    expect(reverseIpLabels('192.0.2.10')).toBe('10.2.0.192')
  })

  it('reverses the nibbles of an expanded IPv6 address', () => {
    expect(reverseIpLabels('2001:db8::1')).toBe(
      '1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2',
    )
    expect(reverseIpLabels('not-an-ip')).toBeNull()
  })

  it('parses the origin answer, keeping the first of several ASNs', () => {
    expect(
      parseAsnOriginTxt('64496 64497 | 192.0.2.0/24 | US | arin | 2001-01-01'),
    ).toEqual({
      asn: 64496,
      prefix: '192.0.2.0/24',
      countryCode: 'US',
      registry: 'arin',
      name: null,
    })
    expect(parseAsnOriginTxt('NA | | | |')).toBeNull()
  })

  it('parses the holder name', () => {
    expect(
      parseAsnNameTxt('64496 | US | arin | 2001-01-01 | EXAMPLE-NET, US'),
    ).toBe('EXAMPLE-NET, US')
    expect(parseAsnNameTxt('64496 | US | arin')).toBeNull()
  })
})
