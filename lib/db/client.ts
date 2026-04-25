import { getDatabaseUrl } from '@/lib/config'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from 'node:path'
import * as schema from './schema'

export const getDb = (() => {
  let db: ReturnType<typeof drizzle> | null = null

  return function getDb(): ReturnType<typeof drizzle> {
    if (db) return db
    const url = getDatabaseUrl()
    const filePath = url.startsWith('file:')
      ? path.resolve(process.cwd(), url.replace(/^file:\/?/, ''))
      : url
    const sqlite = new Database(filePath)
    db = drizzle(sqlite, { schema })
    return db
  }
})()
