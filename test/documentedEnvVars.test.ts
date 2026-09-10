import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * The README's environment table listed four IMAP variables and PROJECT_NAME
 * that no code has ever read, so operators configured a mailbox that was
 * silently ignored. A documented variable is a promise; this test keeps the
 * table to variables the app actually reads, either through the env schema or
 * through a direct `process.env` access.
 */
describe('documented environment variables', () => {
  const repoRoot = process.cwd()

  const readmeVariables = (): string[] => {
    const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8')
    const section = readme.split('### Environment variables')[1] ?? ''
    const table = section.split('\n---')[0] ?? ''
    const names = new Set<string>()
    for (const line of table.split('\n')) {
      if (!line.startsWith('|')) continue
      const cell = line.split('|')[1] ?? ''
      for (const match of cell.matchAll(/`([A-Z][A-Z0-9_]+)`/g)) {
        if (match[1]) names.add(match[1])
      }
    }
    return [...names]
  }

  const sourceFiles = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return sourceFiles(full)
      return /\.tsx?$/.test(entry.name) ? [full] : []
    })

  const readVariables = async (): Promise<Set<string>> => {
    const { envSchema } = await import('@/lib/envSchema')
    const names = new Set(Object.keys(envSchema.shape))
    for (const file of [
      ...sourceFiles(path.join(repoRoot, 'src')),
      ...sourceFiles(path.join(repoRoot, 'scripts')),
    ]) {
      const code = fs.readFileSync(file, 'utf8')
      for (const match of code.matchAll(/env\[['"]([A-Z][A-Z0-9_]+)['"]\]/g)) {
        if (match[1]) names.add(match[1])
      }
      for (const match of code.matchAll(/process\.env\.([A-Z][A-Z0-9_]+)/g)) {
        if (match[1]) names.add(match[1])
      }
    }
    return names
  }

  it('are all read somewhere in the app', async () => {
    const documented = readmeVariables()
    expect(documented.length).toBeGreaterThan(5)

    const read = await readVariables()
    expect(documented.filter((name) => !read.has(name))).toEqual([])
  })
})
