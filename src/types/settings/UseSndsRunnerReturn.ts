export type UseSndsRunnerReturn = {
  readonly isBusy: boolean
  readonly message: string
  readonly setMessage: (value: string) => void
  readonly run: (action: () => Promise<void>) => void
}
