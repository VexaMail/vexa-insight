import type { ImapAccountFormEntry } from '@/types/settings'

/** A blank IMAP account row. `id: 0` marks it as not yet persisted. */
export function newImapAccountEntry(): ImapAccountFormEntry {
  return {
    id: 0,
    label: '',
    server: '',
    port: 993,
    username: '',
    passwordMasked: false,
    passwordNew: '',
    fetchIncludeTrash: false,
    fetchIncludeAllFolders: false,
    postProcessAction: 'none',
    postProcessFolder: null,
    moveToTrashAfterProcess: false,
    markAsReadAfterProcess: false,
  }
}
