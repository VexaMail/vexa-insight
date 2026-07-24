import {
  buildProdContentSecurityPolicy,
  buildProdCspDirectives,
} from '@/utils/security'
import { describe, expect, it } from 'vitest'

describe('buildProdCspDirectives', () => {
  it('embeds the nonce in script-src with strict-dynamic', () => {
    const directives = buildProdCspDirectives('abc123')
    const scriptSrc = directives.find((d) => d.startsWith('script-src'))
    expect(scriptSrc).toContain("'nonce-abc123'")
    expect(scriptSrc).toContain("'strict-dynamic'")
  })

  it('does not allow unsafe-inline scripts', () => {
    const directives = buildProdCspDirectives('abc123')
    const scriptSrc = directives.find((d) => d.startsWith('script-src'))
    expect(scriptSrc).not.toContain("'unsafe-inline'")
  })

  it('keeps framing, object, and base restrictions', () => {
    const directives = buildProdCspDirectives('abc123')
    expect(directives).toContain("frame-ancestors 'none'")
    expect(directives).toContain("object-src 'none'")
    expect(directives).toContain("base-uri 'self'")
  })
})

describe('buildProdContentSecurityPolicy', () => {
  it('joins directives with semicolons', () => {
    const policy = buildProdContentSecurityPolicy('n1')
    expect(policy).toContain("default-src 'self'; script-src")
    expect(policy).toContain("'nonce-n1'")
  })
})
