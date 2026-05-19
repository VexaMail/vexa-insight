import { DEFAULT_DATABASE_URL } from './defaultDatabaseUrl'

/**
 * Reads DATABASE_URL from env. Used by getDb() to avoid circular dependency
 * when getConfig() loads the rest of config from the database.
 *
 * Reads `process.env` directly (not `env` from `@/lib/env`) because the test
 * harness mutates DATABASE_URL after modules are loaded (see
 * `test/setup/setupTestDb.ts`); `env` is frozen after boot-time Zod parse.
 */
function getDatabaseUrl(): string {
  return process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL
}

export { getDatabaseUrl }
