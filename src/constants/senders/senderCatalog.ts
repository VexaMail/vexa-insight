import type { SenderCatalogEntry } from '@/types/senders'
import catalog from './senderCatalog.json'

/**
 * Well-known sending services, matched by reverse DNS hostname or DKIM
 * signing domain suffix. The data lives in `senderCatalog.json` so adding a
 * service is a one-entry change; the first entry that matches wins, so more
 * specific entries come first. `test/classifySender.test.ts` checks every
 * entry's shape and category.
 */
export const SENDER_CATALOG = catalog as readonly SenderCatalogEntry[]
