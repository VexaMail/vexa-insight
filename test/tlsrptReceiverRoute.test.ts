import {
  getDb,
  runMigrations,
  tlsReportFailures,
  tlsReportPolicies,
  tlsReports,
} from '@/lib/db'
import { getOrCreateDomainId } from '@/services/reports'
import type { NextRequest } from 'next/server'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { POST } from '../app/api/v1/tlsrpt/route'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

const REPORT = readFileSync(
  path.join(__dirname, 'fixtures', 'tlsrpt', 'sts-with-failures.json'),
)

async function post(
  body: Buffer,
  contentType: string,
  client = '192.0.2.50',
): Promise<Response> {
  const request = new Request('https://vexa.example.com/api/v1/tlsrpt', {
    method: 'POST',
    headers: { 'content-type': contentType, 'x-forwarded-for': client },
    body: new Uint8Array(body),
  }) as unknown as NextRequest
  return POST(request)
}

describe('POST /api/v1/tlsrpt', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    const db = getDb()
    db.delete(tlsReportFailures).run()
    db.delete(tlsReportPolicies).run()
    db.delete(tlsReports).run()
    resetDmarcDb()
  })

  it('refuses a body that is not a TLS-RPT media type', async () => {
    const res = await post(REPORT, 'application/json')
    expect(res.status).toBe(415)
  })

  it('refuses a report about a domain nobody monitors here', async () => {
    const res = await post(REPORT, 'application/tlsrpt+json')
    expect(res.status).toBe(403)
    expect(getDb().select().from(tlsReports).all()).toHaveLength(0)
  })

  it('stores a gzipped report once and accepts the retry', async () => {
    await getOrCreateDomainId(getDb(), 'example.com')
    const gz = gzipSync(REPORT)
    expect((await post(gz, 'application/tlsrpt+gzip')).status).toBe(201)
    expect((await post(gz, 'application/tlsrpt+gzip')).status).toBe(200)
    expect(getDb().select().from(tlsReports).all()).toHaveLength(1)
  })

  it('answers 400 to a body that does not parse', async () => {
    const res = await post(Buffer.from('{"nope":1}'), 'application/tlsrpt+json')
    expect(res.status).toBe(400)
  })
})
