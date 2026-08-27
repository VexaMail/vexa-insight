/**
 * RBAC roles stored in `users.role`. The set is intentionally small.
 *
 * - `admin`: full access, including user/role management and install.
 * - `operator`: day-to-day ingestion ops (IMAP, reports, settings read).
 * - `viewer`: read-only access to reports.
 * - `user`: legacy alias for `viewer`. Pre-RBAC databases default to
 *   `'user'`; treated as `viewer` everywhere new code reads permissions.
 */
export type Role = 'admin' | 'operator' | 'viewer' | 'user'
