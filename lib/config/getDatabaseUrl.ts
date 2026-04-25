import { DEFAULT_DATABASE_URL } from './defaultDatabaseUrl'

/**
 * Reads DATABASE_URL from env. Used by getDb() to avoid circular dependency
 * when getConfig() loads the rest of config from the database.
 */
function getDatabaseUrl(): string {
  return process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL
}

export { getDatabaseUrl }
