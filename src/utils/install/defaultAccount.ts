import type { AccountWithId } from '@/types/install'

import { DEFAULT_IMAP_PORT } from './defaultImapPort'

export function defaultAccount(): AccountWithId {
  const runtimeCrypto: unknown = Reflect.get(globalThis, 'crypto')
  const fallbackId = 'id_' + Date.now().toString(36)
  let id = fallbackId
  if (
    typeof runtimeCrypto === 'object' &&
    runtimeCrypto !== null &&
    'randomUUID' in runtimeCrypto &&
    typeof runtimeCrypto.randomUUID === 'function'
  ) {
    const generatedId: unknown = crypto.randomUUID()
    if (typeof generatedId === 'string') id = generatedId
  }
  return {
    _id: id,
    label: 'Main account',
    server: '',
    port: DEFAULT_IMAP_PORT,
    username: '',
    password: '',
  }
}
