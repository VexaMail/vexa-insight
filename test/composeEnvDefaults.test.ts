import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * `docker compose up -d` is the README's headline install, and Compose expands
 * `${VAR:-}` to an empty string rather than leaving the variable unset. An
 * empty string is a value: a Zod default does not replace it, and an enum
 * rejects it, so a fallback written as `:-` turns the documented install into
 * a boot failure. This pins every fallback in the compose file against the
 * schema the app parses at startup.
 */
describe('docker-compose environment defaults', () => {
  const composeEnvironment = (): Record<string, string> => {
    const file = fs.readFileSync(
      path.join(process.cwd(), 'docker-compose.yml'),
      'utf8',
    )
    const entries: Record<string, string> = {}
    for (const line of file.split('\n')) {
      const match = /^\s*-\s+([A-Z0-9_]+)=\$\{[A-Z0-9_]+:-(.*)\}\s*$/.exec(line)
      if (match?.[1] !== undefined) entries[match[1]] = match[2] ?? ''
    }
    return entries
  }

  it('parses cleanly through the app env schema', async () => {
    const defaults = composeEnvironment()
    expect(Object.keys(defaults).length).toBeGreaterThan(0)

    const { envSchema } = await import('@/lib/envSchema')
    const result = envSchema.safeParse({ ...process.env, ...defaults })

    expect(
      result.success
        ? []
        : result.error.issues.map((issue) => issue.path.join('.')),
    ).toEqual([])
  })
})
