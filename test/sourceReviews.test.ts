import { getDb, runMigrations, sourceReviews } from '@/lib/db'
import {
  clearSourceReview,
  listSourceReviews,
  setSourceReview,
} from '@/services/source-reviews'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

const IP = '192.0.2.10'
const DOMAIN = 'example.com'

describe('source reviews', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    getDb().delete(sourceReviews).run()
  })

  it('replaces the verdict for the same source and domain', async () => {
    await setSourceReview(
      { ip: IP, domainName: DOMAIN, verdict: 'forwarder', actor: null },
      1_000_000,
    )
    await setSourceReview(
      {
        ip: IP,
        domainName: DOMAIN,
        verdict: 'legitimate',
        note: 'newsletter platform',
        actor: { id: 'u1', name: 'operator' },
      },
      2_000_000,
    )
    expect(await listSourceReviews({ domainName: DOMAIN })).toEqual([
      {
        ip: IP,
        domainName: DOMAIN,
        verdict: 'legitimate',
        note: 'newsletter platform',
        reviewedByName: 'operator',
        reviewedAt: 2000,
      },
    ])
    expect(await listSourceReviews({ ip: IP })).toHaveLength(1)
  })

  it('removes a verdict', async () => {
    await setSourceReview({
      ip: IP,
      domainName: DOMAIN,
      verdict: 'unauthorized',
      actor: null,
    })
    await clearSourceReview(IP, DOMAIN)
    expect(await listSourceReviews({ domainName: DOMAIN })).toEqual([])
  })
})
