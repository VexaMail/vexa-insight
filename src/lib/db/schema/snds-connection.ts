import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Single-row table (id = 1) holding the Microsoft SNDS connection.
 *
 * Both secrets are encrypted with the instance key (`encryptSecret`): the
 * OAuth refresh token, which Microsoft rotates on every use, and the PKCE
 * verifier of an authorization that is still waiting for its code.
 */
export const sndsConnection = sqliteTable('snds_connection', {
  id: integer('id').primaryKey(),
  refreshTokenEncrypted: text('refresh_token_encrypted'),
  pendingVerifierEncrypted: text('pending_verifier_encrypted'),
  pendingCreatedAt: integer('pending_created_at', { mode: 'timestamp' }),
  connectedAt: integer('connected_at', { mode: 'timestamp' }),
  lastSyncAt: integer('last_sync_at', { mode: 'timestamp' }),
  lastSyncStatus: text('last_sync_status'),
  lastSyncError: text('last_sync_error'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
