import type { SndsConnectionPublic } from '@/types/snds'

export type UseSndsConnectionReturn = {
  readonly connection: SndsConnectionPublic | null
  readonly setConnection: (value: SndsConnectionPublic) => void
}
