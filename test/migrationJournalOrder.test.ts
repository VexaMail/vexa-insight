import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * drizzle-kit warns, and its own migrator would skip entries, when journal
 * timestamps do not strictly increase in entry order. 0002_job_runs was
 * hand-written with a placeholder timestamp; this keeps the next one out.
 */
describe('drizzle migration journal', () => {
  it('lists entries with strictly increasing timestamps', () => {
    const journal = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', 'drizzle', 'meta', '_journal.json'),
        'utf8',
      ),
    ) as { entries: { tag: string; when: number }[] }

    const outOfOrder = journal.entries
      .filter(
        (entry, i) =>
          i > 0 && entry.when <= (journal.entries[i - 1]?.when ?? 0),
      )
      .map((entry) => entry.tag)

    expect(outOfOrder).toEqual([])
  })
})
