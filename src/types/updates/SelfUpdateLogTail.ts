export type SelfUpdateLogTail = {
  readonly lines: readonly string[]
  readonly modifiedAt: string | null
  readonly running: boolean
}
