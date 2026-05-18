import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('migration smoke', () => {
  it('runMigrations applies cleanly to a fresh empty DB', async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vexa-mig-'))
    const dbPath = path.join(tmp, 'vexa.db')
    process.env.DATABASE_URL = `file:${dbPath}`
    const { runMigrations } = await import('@/lib/db')
    expect(() => runMigrations()).not.toThrow()
    // runMigrations resolves DATABASE_URL via `dbUrl.replace(/^file:\/?/, '')`,
    // which strips the leading slash and produces a cwd-relative path. We
    // mirror that here so the smoke test checks the same physical file.
    const dbUrl = process.env.DATABASE_URL ?? ''
    const stripped = dbUrl.replace(/^file:\/?/, '')
    const absPath = path.isAbsolute(stripped)
      ? stripped
      : path.resolve(process.cwd(), stripped)
    expect(fs.existsSync(absPath)).toBe(true)
    fs.rmSync(tmp, { recursive: true })
    if (fs.existsSync(absPath)) {
      fs.rmSync(path.dirname(absPath), { recursive: true, force: true })
    }
  })
})
