export type UseAllowlistSourceReturn = {
  readonly listed: boolean
  readonly saving: boolean
  readonly error: string | null
  readonly add: () => void
}
