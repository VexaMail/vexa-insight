import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, describe, expect, it, vi } from 'vitest'
import type * as UpdateConstants from '../src/constants/updates'

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'self-update-log-'))
const logPath = path.join(dir, 'self-update.log')

vi.mock('@/constants/updates', async (importOriginal) => ({
  ...(await importOriginal<typeof UpdateConstants>()),
  SELF_UPDATE_LOG_PATH: logPath,
}))

const { readSelfUpdateLog } =
  await import('../src/services/updates/readSelfUpdateLog')

afterAll(() => {
  fs.rmSync(dir, { recursive: true, force: true })
})

describe('readSelfUpdateLog', () => {
  it('returns an empty tail when the log does not exist', () => {
    expect(readSelfUpdateLog()).toEqual({
      lines: [],
      modifiedAt: null,
      running: false,
    })
  })

  it('reads a fresh unterminated log as running', () => {
    fs.writeFileSync(logPath, 'pulling image\nbuilding\n')
    const tail = readSelfUpdateLog()
    expect(tail.lines).toEqual(['pulling image', 'building'])
    expect(tail.running).toBe(true)
    expect(tail.modifiedAt).not.toBeNull()
  })

  it('reads a log ending in the success line as finished', () => {
    fs.writeFileSync(logPath, 'building\nself-update succeeded\n')
    expect(readSelfUpdateLog().running).toBe(false)
  })
})
