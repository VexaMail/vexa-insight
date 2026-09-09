import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('migration smoke', () => {
  // Loads better-sqlite3 and replays every migration; a cold shared CI
  // runner has taken just over the 5 s default, so give it real headroom.
  it(
    'runMigrations applies cleanly to a fresh empty DB',
    { timeout: 30_000 },
    async () => {
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vexa-mig-'))
      const dbPath = path.join(tmp, 'vexa.db')
      process.env.DATABASE_URL = `file:${dbPath}`
      const { runMigrations, resolveDbFilePath } = await import('@/lib/db')
      expect(() => {
        runMigrations()
      }).not.toThrow()
      const absPath = resolveDbFilePath(process.env.DATABASE_URL)
      expect(fs.existsSync(absPath)).toBe(true)
      fs.rmSync(tmp, { recursive: true })
      if (fs.existsSync(absPath)) {
        fs.rmSync(path.dirname(absPath), { recursive: true, force: true })
      }
    },
  )
})
