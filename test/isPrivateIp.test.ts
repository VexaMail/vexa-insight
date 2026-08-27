/* eslint-disable sonarjs/no-hardcoded-ip -- this file is the IP classifier's test suite; hardcoded IPs are the inputs under test */
import { describe, expect, it } from 'vitest'
import { isPrivateIp } from '../src/services/security/isPrivateIp'

describe('isPrivateIp', () => {
  const cases: Array<[string, boolean]> = [
    ['127.0.0.1', true],
    ['127.255.255.254', true],
    ['10.0.0.1', true],
    ['10.255.255.255', true],
    ['172.16.0.1', true],
    ['172.31.255.255', true],
    ['172.32.0.1', false],
    ['192.168.0.1', true],
    ['169.254.169.254', true],
    ['100.64.0.1', true],
    ['100.127.255.255', true],
    ['0.0.0.0', true],
    ['255.255.255.255', true],
    ['8.8.8.8', false],
    ['1.1.1.1', false],
    ['::1', true],
    ['fe80::1', true],
    ['fc00::1', true],
    ['fd00::abcd', true],
    ['::ffff:127.0.0.1', true],
    ['::ffff:8.8.8.8', false],
    ['::ffff:0a00:0001', true],
    ['fe81::1', true],
    ['febf::ffff', true],
    ['fec0::1', false],
    ['2001:4860:4860::8888', false],
  ]
  for (const [ip, expected] of cases) {
    it(`${ip} -> ${String(expected)}`, () => {
      expect(isPrivateIp(ip)).toBe(expected)
    })
  }
})
