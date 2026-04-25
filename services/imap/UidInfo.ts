import type { FetchMessageObject } from 'imapflow'

export type UidInfo = {
  mid: string
  date?: string
  subject?: string
  env?: FetchMessageObject
}
