import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveDbFilePath } from '@/lib/db'

describe('resolveDbFilePath', () => {
  it('resolves file: with relative dot path against cwd', () => {
    const result = resolveDbFilePath('file:./data/vexa.db')
    expect(result).toBe(path.resolve(process.cwd(), './data/vexa.db'))
  })

  it('resolves file: with bare relative path against cwd', () => {
    const result = resolveDbFilePath('file:data/vexa.db')
    expect(result).toBe(path.resolve(process.cwd(), 'data/vexa.db'))
  })

  it('preserves absolute path with single slash after file:', () => {
    const result = resolveDbFilePath('file:/var/lib/vexa/vexa.db')
    expect(result).toBe('/var/lib/vexa/vexa.db')
  })

  it('preserves absolute path with file:/// URI form', () => {
    const result = resolveDbFilePath('file:///var/lib/vexa/vexa.db')
    expect(result).toBe('/var/lib/vexa/vexa.db')
  })

  it('strips authority component in file://host/path form', () => {
    const result = resolveDbFilePath('file://localhost/var/lib/vexa.db')
    expect(result).toBe('/var/lib/vexa.db')
  })

  it('returns non-file URLs unchanged', () => {
    const result = resolveDbFilePath('libsql://example.turso.io')
    expect(result).toBe('libsql://example.turso.io')
  })
})
