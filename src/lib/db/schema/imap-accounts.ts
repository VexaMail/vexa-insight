import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * IMAP accounts for multi-account ingestion. Ordered by sortOrder.
 */
export const imapAccounts = sqliteTable('imap_accounts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull().default(''),
  server: text('server').notNull().default(''),
  port: integer('port').notNull().default(993),
  username: text('username').notNull().default(''),
  password: text('password').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  fetchIncludeTrash: integer('fetch_include_trash', { mode: 'boolean' })
    .notNull()
    .default(false),
  fetchIncludeAllFolders: integer('fetch_include_all_folders', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  postProcessAction: text('post_process_action').notNull().default('mark_read'), // 'do_nothing', 'mark_read', 'move_to_folder', 'move_to_new_folder'
  postProcessFolder: text('post_process_folder'),
  moveToTrashAfterProcess: integer('move_to_trash_after_process', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  markAsReadAfterProcess: integer('mark_as_read_after_process', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
})
