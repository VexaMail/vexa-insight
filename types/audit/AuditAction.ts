/**
 * Canonical, append-only set of audit actions. New entries are added to the
 * end of the union; never rename or remove an existing action because past
 * `audit_log.action` rows reference these strings as data.
 */
export type AuditAction =
  | 'auth.login.success'
  | 'auth.login.failure'
  | 'auth.logout'
  | 'install.completed'
  | 'install.token.regenerated'
  | 'user.role.changed'
  | 'user.created'
  | 'user.deleted'
  | 'settings.updated'
  | 'imap.account.created'
  | 'imap.account.updated'
  | 'imap.account.deleted'
  | 'imap.secret.rotated'
  | 'auth.sessions.revoked'
