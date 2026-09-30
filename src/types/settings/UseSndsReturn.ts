import type { SndsConnectionPublic } from '@/types/snds'

export type UseSndsReturn = {
  readonly connection: SndsConnectionPublic | null
  readonly authorizeUrl: string | null
  readonly redirectUrl: string
  readonly setRedirectUrl: (value: string) => void
  readonly isBusy: boolean
  readonly message: string
  readonly handleConnect: () => void
  readonly handleSubmitRedirect: () => void
  readonly handleSync: () => void
  readonly handleDisconnect: () => void
}
