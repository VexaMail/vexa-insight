import type { AccountWithId } from '@/types/install'

import { DEFAULT_IMAP_PORT } from './defaultImapPort'

export function defaultAccount(): AccountWithId {
  return {
    _id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'id_' + Date.now().toString(36),
    label: 'Main account',
    server: '',
    port: DEFAULT_IMAP_PORT,
    username: '',
    password: '',
  }
}
