import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('user'), // 'admin' | 'user'
  // Identity asserted by the OIDC provider. The pair binds a local row to
  // one subject at one issuer, so a login is matched on the identifier the
  // IdP guarantees to be stable rather than on a mutable email claim.
  oidcIssuer: text('oidc_issuer'),
  oidcSubject: text('oidc_subject'),
  theme: text('theme').notNull().default('system'), // 'system' | 'light' | 'dark'
  tablePreferences: text('table_preferences'), // JSON string
  allowedDomains: text('allowed_domains'), // JSON string of domain names
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})
