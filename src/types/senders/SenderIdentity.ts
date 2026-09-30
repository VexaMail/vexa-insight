import type { SenderCategory } from './SenderCategory'

/** The service a source was recognised as, and what it was matched on. */
export type SenderIdentity = {
  name: string
  category: SenderCategory
  matchedOn: 'hostname' | 'dkim'
}
