import type { RequestClientMeta } from './RequestClientMeta'

export type LoginFailureInput = RequestClientMeta & {
  readonly actorId?: string
  readonly actorEmail: string
  readonly reason: 'unknown_user' | 'bad_password'
}
