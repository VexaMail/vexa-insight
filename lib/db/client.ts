import { getDatabaseUrl } from '@/lib/config'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { resolveDbFilePath } from './resolveDbFilePath'
import * as schema from './schema'

export const getDb = (() => {
  let db: ReturnType<typeof drizzle> | null = null

  return function getDb(): ReturnType<typeof drizzle> {
    if (db) return db
    const url = getDatabaseUrl()
    const filePath = resolveDbFilePath(url)
    const sqlite = new Database(filePath)
    db = drizzle(sqlite, { schema })
    return db
  }
})()
